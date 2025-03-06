import { NextResponse, NextRequest } from 'next/server';
import dayjs from 'dayjs';
import { generateToken, verifyToken } from '@services/token';
import { response, setCookie } from '@services';
import { messages } from '@constants';

// This function can be marked `async` if using `await` inside
export const middleware = async (request: NextRequest) => {
  const { cookies } = request;
  const accessToken = cookies.get('accessToken');
  if (!accessToken) {
    return NextResponse.next();
  }
  console.log('1');

  try {
    await verifyToken(accessToken.value);
    console.log('2 access token ㅇㅇ');
    return NextResponse.next();
  } catch (accessError) {
    console.log('3 access token error');
    const refreshToken = cookies.get('refreshToken');
    if (!refreshToken) {
      return new NextResponse(
        JSON.stringify({ message: messages.error.jwt.invalid }),
        { status: 401 },
      );
    }
    try {
      const refreshTokenResult = await verifyToken(
        refreshToken.value,
        'refresh',
      );
      const newAccessToken = await generateToken(refreshTokenResult, {
        expiresIn: '30s',
      });
      console.log('4 토큰발급');

      const response = NextResponse.next();
      response.cookies.set('accessToken', newAccessToken, {
        expires: dayjs().add(1, 'hours').toDate(),
        httpOnly: true,
      });

      return response;
    } catch (refreshError) {
      return new NextResponse(
        JSON.stringify({ message: messages.error.jwt.invalid }),
        { status: 401 },
      );
    }
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/api/:path*'],
};

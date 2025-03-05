import { type JWTPayload, jwtVerify, SignJWT } from 'jose';
import { JOSEError } from 'jose/errors';
import { config } from '@config';
import { messages } from '@constants';

type TokenType = 'access' | 'refresh';

interface Payload extends JWTPayload {
  id: number;
  email: string;
}

const getSecretKey = (type: TokenType) => {
  return new TextEncoder().encode(config.jwt.secret[type]);
};

export const generateToken = async (
  payload: Payload,
  options?: { expiresIn?: string },
  type: TokenType = 'access',
) => {
  try {
    const secretKey = getSecretKey(type);

    const jwt = new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' }) // 알고리즘 지정
      .setIssuedAt()
      .setExpirationTime(options?.expiresIn || '1h'); // 기본 만료 시간 1시간

    return await jwt.sign(secretKey);
  } catch (error) {
    console.error(error);
    return '';
  }
};

export const verifyToken = async (
  token: string,
  type: TokenType = 'access',
) => {
  try {
    const secretKey = getSecretKey(type);
    const { payload } = await jwtVerify<Payload>(token, secretKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    if (error instanceof JOSEError) {
      if (error.code === 'ERR_JWT_EXPIRED') {
        throw new Error(messages.error.jwt.expired);
      }
      if (error.code === 'ERR_JWS_INVALID') {
        throw new Error(messages.error.jwt.invalid);
      }
      if (error.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') {
        throw new Error(messages.error.jwt.expired);
      }
    }
    throw new Error(messages.error.unknown);
  }
};

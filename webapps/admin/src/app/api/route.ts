import { NextResponse } from 'next/server';
import type { BaseResponse } from '@packages/types/response';

interface ResponseData extends BaseResponse {
  github: 'https://github.com/ppyom';
}

export const GET = async () => {
  const data: ResponseData = {
    message: '안녕하세요',
    github: 'https://github.com/ppyom',
  };
  const options: ResponseInit = {
    status: 200,
  };

  return new NextResponse(JSON.stringify(data), options);
};

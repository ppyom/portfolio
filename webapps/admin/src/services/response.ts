import { NextResponse } from 'next/server';
import type { BaseResponse } from '@packages/types/response';

export const response = <T extends BaseResponse>(data: T, status: number) => {
  return new NextResponse(JSON.stringify(data), {
    status,
  });
};

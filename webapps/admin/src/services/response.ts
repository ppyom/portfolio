import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { BaseResponse } from '@packages/types/response';
import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

export const response = <T extends BaseResponse>(data: T, status: number) => {
  return new NextResponse(JSON.stringify(data), {
    status,
  });
};

export const setCookie = async (
  name: string,
  value: string,
  options?: Partial<ResponseCookie>,
) => {
  const cookieStore = await cookies();
  cookieStore.set(name, value, options);
};

export const getCookie = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.get(name);
};

export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};

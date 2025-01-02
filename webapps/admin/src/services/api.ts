import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';
import type { BaseResponse } from '@packages/types/response';

const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/api/`,
  withCredentials: true,
  timeout: 10000,
});

/**
 * Error가 발생한 응답
 * @param error
 */
const onError = <T extends BaseResponse>(error: AxiosError<T>) => {
  if (error.response) {
    const { message } = error.response.data;
    // TODO Error 처리
    console.log(message);
  }
  return Promise.reject(error);
};

instance.interceptors.response.use(null, onError);

export const api = {
  /**
   * HTTP GET Method
   * @param url api 엔드포인트
   * @param params `optional` query parameter
   * @param options `optional` AxiosRequestConfig
   */
  get: async <T extends BaseResponse, P = undefined>(
    url: string,
    params: P,
    options?: AxiosRequestConfig,
  ) =>
    instance
      .get<T>(url, { params: params && { ...params }, ...options })
      .then(responseToData),
  /**
   * HTTP POST Method
   * @param url api 엔드포인트
   * @param data `optional` body
   * @param options `optional` AxiosRequestConfig
   */
  post: async <T extends BaseResponse, D = undefined>(
    url: string,
    data?: D,
    options?: AxiosRequestConfig,
  ) => instance.post<T>(url, data && { ...data }, options).then(responseToData),
  /**
   * HTTP PUT Method
   * @param url api 엔드포인트
   * @param data `optional` body
   * @param options `optional` AxiosRequestConfig
   */
  put: async <T extends BaseResponse, D = undefined>(
    url: string,
    data?: D,
    options?: AxiosRequestConfig,
  ) => instance.put<T>(url, data && { ...data }, options).then(responseToData),
  /**
   * HTTP PATCH Method
   * @param url api 엔드포인트
   * @param data `optional` body
   * @param options `optional` AxiosRequestConfig
   */
  patch: async <T extends BaseResponse, D = undefined>(
    url: string,
    data?: D,
    options?: AxiosRequestConfig,
  ) =>
    instance.patch<T>(url, data && { ...data }, options).then(responseToData),
  /**
   * HTTP DELETE Method
   * @param url api 엔드포인트
   * @param options `optional` AxiosRequestConfig
   */
  delete: async <T extends BaseResponse>(
    url: string,
    options?: AxiosRequestConfig,
  ) => instance.delete<T>(url, options).then(responseToData),
} as const;

const responseToData = <T extends BaseResponse>(res: AxiosResponse<T>): T => {
  return res.data;
};

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

import { config } from '@/lib/config';

const client = new S3Client({
  region: config.cloudflare.region,
  endpoint: config.cloudflare.endpoint,
  credentials: {
    accessKeyId: config.cloudflare.accessKey,
    secretAccessKey: config.cloudflare.secretKey,
  },
});

// 공개 URL에는 인코딩된 키가 들어가므로 R2 키로 쓰려면 다시 디코딩해야 한다
const extractObjectKey = (url: string) => {
  const encodedKey = url.split(`${config.cloudflare.publicUrl}/`)[1];
  return encodedKey && decodeURIComponent(encodedKey);
};

interface UploadOptions {
  /** 저장 경로 접두어 */
  prefix?: string;
  /** 키 끝에 붙일 원본 파일명 (공개 URL에서 파일명을 복원할 때 사용) */
  keepFileName?: boolean;
  /** 브라우저가 열지 않고 내려받도록 Content-Disposition: attachment 지정 */
  attachment?: boolean;
}

/**
 * Cloudflare R2에 파일을 업로드하는 함수
 * @param file 업로드할 파일
 * @param options 저장 경로·파일명·다운로드 방식 옵션
 * @returns 업로드된 파일의 공개 URL
 */
export const upload = async (
  file: File,
  {
    prefix = 'projects',
    keepFileName = false,
    attachment = false,
  }: UploadOptions = {},
) => {
  const arrayBuffer = await file.arrayBuffer();
  const segments = [prefix, crypto.randomUUID()];
  if (keepFileName) segments.push(file.name);

  const key = segments.join('/');
  await client.send(
    new PutObjectCommand({
      Bucket: config.cloudflare.bucket,
      Key: key,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type,
      ContentDisposition: attachment
        ? `attachment; filename*=UTF-8''${encodeURIComponent(file.name)}`
        : undefined,
    }),
  );

  return `${config.cloudflare.publicUrl}/${segments.map(encodeURIComponent).join('/')}`;
};

/**
 * Cloudflare R2에 업로드한 파일을 삭제하는 함수
 * @param url 업로드 url
 */
export const remove = async (url: string) => {
  const objectKey = extractObjectKey(url);

  if (!objectKey) {
    return;
  }

  return client.send(
    new DeleteObjectCommand({
      Bucket: config.cloudflare.bucket,
      Key: objectKey,
    }),
  );
};

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

const extractObjectKey = (url: string) =>
  url.split(`${config.cloudflare.publicUrl}/`)[1];

/**
 * Cloudflare R2에 파일을 업로드하는 함수
 * @param file
 */
export const upload = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const key = `projects/${crypto.randomUUID()}`;
  await client.send(
    new PutObjectCommand({
      Bucket: config.cloudflare.bucket,
      Key: key,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type,
    }),
  );

  return `${config.cloudflare.publicUrl}/${key}`;
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

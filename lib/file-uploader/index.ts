import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({
  region: process.env.CLOUDFLARE_REGION,
  endpoint: process.env.CLOUDFLARE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_KEY!,
  },
});

/**
 * Cloudflare R2에 파일을 업로드하는 함수
 * @param file
 */
export const upload = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const key = `projects/${crypto.randomUUID()}`;
  await client.send(
    new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET,
      Key: key,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type,
    }),
  );

  return `${process.env.CLOUDFLARE_PUBLIC_URL}/${key}`;
};

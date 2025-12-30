import { ImageResponse } from 'next/og';
import type { Properties } from 'csstype';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { getPublicProject } from '@/database/queries/project';

const containerStyle: Properties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '80px',
  background: '#231B00',
  color: '#ffffff',
  fontFamily: 'Pretendard',
};

const imageSize = { width: 1200, height: 630 };

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const [project] = await getPublicProject(id);

  const font = await readFile(
    path.join(process.cwd(), 'public/fonts/og/Pretendard-Bold.otf'),
  );

  // 프로젝트가 없을 경우 fallback
  if (!project) {
    return new ImageResponse(<div style={containerStyle} />, {
      ...imageSize,
      fonts: [
        {
          name: 'Pretendard',
          data: font,
          weight: 700,
        },
      ],
    });
  }

  return new ImageResponse(
    <div style={containerStyle}>
      <h1 style={{ fontSize: 72, marginBottom: 24 }}>{project.title}</h1>

      {project.description && (
        <p
          style={{
            fontSize: 32,
            lineHeight: 1.4,
            opacity: 0.9,
          }}
        >
          {project.description}
        </p>
      )}
    </div>,
    {
      ...imageSize,
      fonts: [
        {
          name: 'Pretendard',
          data: font,
          weight: 700,
        },
      ],
    },
  );
}

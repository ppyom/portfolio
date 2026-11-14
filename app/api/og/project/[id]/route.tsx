import type { CSSProperties } from 'react';
import { ImageResponse } from 'next/og';
import { hasLocale } from 'next-intl';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { getProject } from '@/services/project';
import { routing } from '@/i18n/routing';

const containerStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: '80px',
  background: '#12120F',
  color: '#FAF8F1',
  fontFamily: 'SUITE',
};

const imageSize = { width: 1200, height: 630 };

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  // /api는 언어 라우팅 밖이라 ?lang=으로 언어를 받고, 지원하지 않는 값이면 기본 언어로 그린다
  const lang = new URL(request.url).searchParams.get('lang');
  const language = hasLocale(routing.locales, lang)
    ? lang
    : routing.defaultLocale;
  const project = await getProject(id, { isPublic: true, language });

  const font = await readFile(
    path.join(process.cwd(), 'public/fonts/og/SUITE-Bold.otf'),
  );

  // 프로젝트가 없을 경우 fallback
  if (!project) {
    return new ImageResponse(<div style={containerStyle} />, {
      ...imageSize,
      fonts: [
        {
          name: 'SUITE',
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
          name: 'SUITE',
          data: font,
          weight: 700,
        },
      ],
    },
  );
}

'use client';

import { useTheme } from 'next-themes';
import { NotionRenderer } from 'react-notion-x';
import type { ExtendedRecordMap } from 'notion-types';
import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'katex/dist/katex.min.css';

interface Props {
  recordMap: ExtendedRecordMap;
}

export default function ProjectDetail({ recordMap }: Props) {
  const { theme, systemTheme } = useTheme();
  return (
    <NotionRenderer
      recordMap={recordMap}
      className="font-ddobak!"
      darkMode={
        theme === 'dark' || (theme === 'system' && systemTheme === 'dark')
      }
      components={{
        Collection: () => <></>,
      }}
    />
  );
}

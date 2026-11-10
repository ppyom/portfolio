'use client';

import { useEffect } from 'react';

interface Props {
  lang: string;
}

// <html>은 언어 전환 시 다시 렌더링되지 않는 루트 레이아웃에 있으므로,
// 새로고침 없이 언어를 바꿨을 때 lang 속성만 여기서 맞춘다. (첫 접속은 서버가 올바른 lang을 내려준다)
export function HtmlLang({ lang }: Props) {
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}

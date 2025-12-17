'use client';

import { useEffect, useState } from 'react';

interface Options {
  enable?: boolean;
  offset?: number;
}

export function useScrollVisibility({
  enable = true,
  offset = 40,
}: Options = {}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enable) {
      return;
    }

    const onScroll = () => {
      setVisible(window.scrollY > offset);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [enable, offset]);

  return {
    visible,
  };
}

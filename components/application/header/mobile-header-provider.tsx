'use client';

import { createContext, useContext, useState } from 'react';

interface ContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onClose: () => void;
}

const MobileHeaderContext = createContext<ContextProps>({
  open: false,
  setOpen: () => {},
  onClose: () => {},
});

interface ComponentProps {
  children: React.ReactNode;
}

/**
 * @deprecated 이후 각 페이지 컴포넌트 구현 시 제거됩니다,
 */
export default function MobileHeaderProvider({ children }: ComponentProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MobileHeaderContext value={{ open, setOpen, onClose: handleClose }}>
      {children}
    </MobileHeaderContext>
  );
}

/**
 * @deprecated 이후 각 페이지 컴포넌트 구현 시 제거됩니다,
 */
export function useMobileHeader() {
  const context = useContext(MobileHeaderContext);

  if (!context) {
    throw new Error('MobileHeader 안에서 사용해주세요.');
  }

  return context;
}

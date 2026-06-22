import { createPortal } from 'react-dom';

export function DialogPortal({ children }: { children: React.ReactNode }) {
  if (typeof window === 'undefined') {
    return null;
  }

  return createPortal(children, document.body);
}

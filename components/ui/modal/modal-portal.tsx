import { createPortal } from 'react-dom';

export function ModalPortal({ children }: { children: React.ReactNode }) {
  if (typeof window === 'undefined') {
    return null;
  }

  return createPortal(children, document.body);
}

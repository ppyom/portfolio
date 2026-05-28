import { useCallback, useEffect, useState } from 'react';

import { registerToast } from './toast';
import ToastContext, {
  type ToastItem,
  type ToastPosition,
} from './toast-context';
import { ToastViewport } from './toast-viewport';

interface Props {
  children: React.ReactNode;
  position?: ToastPosition;
}

export function ToastProvider({ children, position = 'top-right' }: Props) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) =>
      prev.map((toast) =>
        toast.id === id
          ? {
              ...toast,
              visible: false,
            }
          : toast,
      ),
    );

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 300);
  }, []);

  const addToast = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = crypto.randomUUID();

      setToasts((prev) => [
        {
          id,
          visible: false,
          ...toast,
        },
        ...prev,
      ]);

      requestAnimationFrame(() => {
        setToasts((prev) =>
          prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  visible: true,
                }
              : item,
          ),
        );
      });

      if (toast.duration !== Infinity) {
        setTimeout(() => {
          removeToast(id);
        }, toast.duration ?? 3000);
      }
    },
    [removeToast],
  );

  useEffect(() => {
    return registerToast(addToast);
  }, [addToast]);

  return (
    <ToastContext.Provider
      value={{
        position,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
}

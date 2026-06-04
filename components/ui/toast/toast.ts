import type { ToastItem } from './toast-context';

type CreateToast = (toast: Omit<ToastItem, 'id'>) => void;

let createToast: CreateToast | null = null;

export function registerToast(handler: CreateToast) {
  createToast = handler;

  return () => {
    createToast = null;
  };
}

export function toast(
  title?: string,
  options?: Omit<ToastItem, 'id' | 'title'>,
) {
  if (!title) return;
  createToast?.({
    title,
    ...options,
  });
}

toast.success = (title?: string, description?: string) =>
  toast(title, {
    description,
    variant: 'success',
  });

toast.error = (title?: string, description?: string) =>
  toast(title, {
    description,
    variant: 'error',
  });

toast.warning = (title?: string, description?: string) =>
  toast(title, {
    description,
    variant: 'warning',
  });

toast.info = (title?: string, description?: string) =>
  toast(title, {
    description,
    variant: 'info',
  });

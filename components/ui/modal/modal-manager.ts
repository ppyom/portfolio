let modalStack: string[] = [];

export function pushModal(id: string) {
  modalStack.push(id);

  if (modalStack.length === 1) {
    document.body.style.overflow = 'hidden';
  }
}

export function removeModal(id: string) {
  modalStack = modalStack.filter((modalId) => modalId !== id);

  if (modalStack.length === 0) {
    document.body.style.overflow = '';
  }
}

export function isTopModal(id: string) {
  return modalStack.at(-1) === id;
}

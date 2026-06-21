import type { FormDataType } from '@/lib/validation/contact.schema';

export function createContactDefaultValues(): FormDataType {
  return {
    name: '',
    company: '',
    email: '',
    title: '',
    content: '',
  };
}

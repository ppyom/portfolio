export interface FieldItem {
  name: string;
  label: string;
  placeholder?: string;
  colSpan?: 'full' | 'half';
  type?: 'input' | 'select';
  options?: { label: string; value: string }[];
  required?: boolean;
}

import type { ComponentPropsWithRef } from 'react';
import { cn } from '../../utils';

type InputProps = Pick<
  ComponentPropsWithRef<'input'>,
  'ref' | 'value' | 'onChange' | 'placeholder' | 'name' | 'id' | 'disabled'
>;

interface Props extends InputProps {
  className?: string;
}

export const Input = ({
  value,
  onChange,
  placeholder,
  className,
  disabled,
  ...props
}: Props) => {
  return (
    <input
      {...props}
      className={cn(
        'outline-none',
        'px-3 py-2.5',
        'rounded-lg text-sm',
        'bg-base-white border-[1px] duration-200',
        'placeholder:text-neutral-400',
        'border-brand-primary placeholder-shown:border-neutral-200 focus:placeholder-shown:border-neutral-300',
        'disabled:bg-neutral-100 disabled:border-neutral-300',
        className,
      )}
      value={value}
      onChange={onChange}
      placeholder={placeholder || ' '}
      disabled={disabled}
    />
  );
};

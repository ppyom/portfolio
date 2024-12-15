import React from 'react';
import type { ChildrenProps } from '@packages/types/components';
import { cn } from '../../utils';

export const typographyTypes = [
  'heading',
  'title',
  'title_bold',
  'description',
  'description_bold',
  'caption',
  'caption_bold',
] as const;

type TypographyTypes = (typeof typographyTypes)[number];

interface Props extends ChildrenProps {
  type?: TypographyTypes;
  className?: string;
}

export const Typography = ({ type = 'title', className, children }: Props) => {
  return (
    <div
      className={cn(
        type === 'heading' && 'text-2xl font-extrabold leading-snug',
        type.includes('title') && 'text-base leading-normal',
        type.includes('description') && 'text-sm leading-normal',
        type.includes('caption') && 'text-xs leading-normal',
        type.includes('bold') && 'font-bold',
        className,
      )}
    >
      {children}
    </div>
  );
};

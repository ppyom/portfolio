import React from 'react';
import type { ChildrenProps } from 'types/components';

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

const getStyles = (type: Props['type'], className: string) => {
  const classNames = [];

  if (type === 'heading') {
    classNames.push('text-2xl font-extrabold leading-snug');
  } else {
    classNames.push('leading-normal');

    if (type.includes('title')) {
      classNames.push('text-base');
    }
    if (type.includes('description')) {
      classNames.push('text-sm');
    }
    if (type.includes('caption')) {
      classNames.push('text-xs');
    }

    if (type.includes('bold')) {
      classNames.push('font-bold');
    }
  }

  if (className) {
    classNames.push(className);
  }

  return classNames.join(' ');
};

export const Typography = ({
  type = 'title',
  className = '',
  children,
}: Props) => {
  return <div className={getStyles(type, className)}>{children}</div>;
};

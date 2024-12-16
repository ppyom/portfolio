import React from 'react';
import { IconObject, IconName as IconType } from './icons';
import { cn } from '../utils';

interface Props {
  type?: IconType;
  className?: string;
}

export const Icon = ({ type = 'test', className }: Props) => {
  const IconComponent = IconObject[type];
  return <IconComponent className={cn(className)} />;
};

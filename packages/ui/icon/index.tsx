import React from 'react';
import { IconObject, IconName as IconType } from './icons';

interface Props {
  type?: IconType;
}

export const Icon = ({ type = 'test' }: Props) => {
  const IconComponent = IconObject[type];
  return <IconComponent />;
};

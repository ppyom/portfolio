import type { ComponentProps } from 'react';
import { Breadcrumb } from '../Breadcrumb';
import { Profile } from '../Profile';
import { cn } from '../../utils';

interface Props
  extends ComponentProps<typeof Breadcrumb>,
    ComponentProps<typeof Profile> {}

export const Header = ({ menus, name, image, isGuest }: Props) => {
  return (
    <header
      className={cn(
        'flex items-center justify-between',
        'p-4',
        'bg-base-white shadow',
      )}
    >
      <Breadcrumb menus={menus} />
      <Profile name={name} image={image} isGuest={isGuest} />
    </header>
  );
};

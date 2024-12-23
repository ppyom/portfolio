import { Avatar } from '../Avatar';
import { Typography } from '../../atoms';
import { cn } from '../../utils';

interface Props {
  name: string;
  image: string | null;
  isGuest?: boolean;
}

export const Profile = ({ name, image, isGuest }: Props) => {
  return (
    <div className={cn('flex items-center gap-2')}>
      <Typography className="text-neutral-400">{name}</Typography>
      <Avatar url={image} isGuest={isGuest} />
    </div>
  );
};

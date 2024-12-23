import { Icon } from '../../icon';
import { cn } from '../../utils';

interface Props {
  url: string | null;
  isGuest?: boolean;
}

export const Avatar = ({ url, isGuest }: Props) => {
  return (
    <div className={cn('aspect-square size-8', 'rounded-full overflow-hidden')}>
      {url && (
        <img className="size-full object-cover" src={url} alt="프로필 이미지" />
      )}
      {!url && (
        <div
          className={cn(
            'size-full object-cover',
            'flex items-center justify-center',
            isGuest ? 'bg-neutral-400' : 'bg-brand-primary',
          )}
        >
          <Icon className="text-white" type="my" />
        </div>
      )}
    </div>
  );
};

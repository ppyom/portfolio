import { useDialog } from './dialog-context';

export function DialogDescription(
  props: React.HTMLAttributes<HTMLParagraphElement>,
) {
  const { id } = useDialog();
  return (
    <p
      id={`${id}-description`}
      className="text-sm text-text-muted"
      {...props}
    />
  );
}

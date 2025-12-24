import ContentTitle from './content-title';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function ProjectContentBase({ title, children }: Props) {
  return (
    <div className="space-y-2">
      <ContentTitle>{title}</ContentTitle>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

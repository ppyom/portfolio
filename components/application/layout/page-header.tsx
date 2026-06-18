interface Props {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: Props) {
  return (
    <div className="mb-10 space-y-2">
      <p className="text-3xl font-bold text-text-primary">{title}</p>
      <p className="text-text-secondary text-sm">{description}</p>
    </div>
  );
}

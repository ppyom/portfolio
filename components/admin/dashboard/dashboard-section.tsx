interface Props {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function DashboardSection({
  title,
  action,
  children,
  className,
}: Props) {
  return (
    <div className="rounded-md border bg-surface-secondary p-6">
      <div className="flex items-center justify-between pb-4">
        <p className="text-sm font-medium text-text-secondary">{title}</p>
        {action}
      </div>
      <div className={className}>{children}</div>
    </div>
  );
}

export default function ProjectCardSkeleton() {
  return (
    <div className="bg-background rounded-xl overflow-hidden border border-border animate-pulse">
      <div className="overflow-hidden h-48 bg-muted" />
      <div className="p-6 space-y-4">
        <div className="h-6 w-32 bg-muted rounded" />
        <div className="h-4 w-full bg-muted rounded" />
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="h-6 w-12 bg-muted rounded-full" />
          <div className="h-6 w-16 bg-muted rounded-full" />
          <div className="h-6 w-20 bg-muted rounded-full" />
        </div>
      </div>
    </div>
  );
}

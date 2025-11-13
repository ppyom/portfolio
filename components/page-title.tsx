interface Props {
  children: React.ReactNode;
}

export function PageTitle({ children }: Props) {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-4xl md:text-5xl font-bold text-foreground/80 font-dongle">
        {children}
      </h2>
      <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
    </div>
  );
}

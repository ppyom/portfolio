interface Props {
  children: React.ReactNode;
}

export default function SectionTitle({ children }: Props) {
  return (
    <h3 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3 font-dongle">
      {children}
    </h3>
  );
}

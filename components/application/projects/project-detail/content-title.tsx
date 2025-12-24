interface Props {
  children: React.ReactNode;
}

export default function ContentTitle({ children }: Props) {
  return <p className="text-lg font-bold text-foreground">{children}</p>;
}

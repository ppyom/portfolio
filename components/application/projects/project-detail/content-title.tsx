interface Props {
  children: React.ReactNode;
}

/**
 * @deprecated
 */
export default function ContentTitle({ children }: Props) {
  return <p className="text-lg font-bold text-foreground">{children}</p>;
}

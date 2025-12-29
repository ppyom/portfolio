interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return <main className="max-w-4xl mx-auto p-4 space-y-6">{children}</main>;
}

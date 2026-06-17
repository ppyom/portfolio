import Link from 'next/link';

export function Logo() {
  return (
    <Link
      href="/public"
      className="text-xl tracking-tighter text-brand-primary"
    >
      PPYOM
    </Link>
  );
}

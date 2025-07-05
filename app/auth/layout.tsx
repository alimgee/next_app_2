import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign In - Molly Rose",
  description: "Sign in to access the Molly Rose Foundation administrative area.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

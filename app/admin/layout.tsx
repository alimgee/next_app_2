import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Admin - Molly Rose",
  description: "Administrative area for managing Molly Rose Foundation content.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

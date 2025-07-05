import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from '@/components/Menu';
import Footer from '@/components/Footer';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Providers from '../app/providers'; // Import the new Providers component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Molly Rose - Driving Awareness of Childhood Cancer",
  description: "The Molly Rose Foundation drives awareness of childhood cancer and provides information about signs, symptoms, and support for families affected by childhood cancer.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' }
    ],
    shortcut: '/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}> {/* Use the Providers component */}
          <Menu />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

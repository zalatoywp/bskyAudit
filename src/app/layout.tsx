import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bsky Audit',
  description: 'Auditoría de perfiles de Bluesky',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" type="image/png" href="/images/ico.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
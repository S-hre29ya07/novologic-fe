import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Widget Dashboard',
  description: 'Drag & drop widget dashboard with persistence',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Product Management System',
  description: 'Manage your products and ingredients efficiently',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="border-b">
          <div className="container mx-auto px-4 py-4 flex gap-4">
            <Link href="/nuevodashboard">
              <Button variant="ghost">Products</Button>
            </Link>
            <Link href="/nuevodashboard/ingredientes">
              <Button variant="ghost">Ingredients</Button>
            </Link>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
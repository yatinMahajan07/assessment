import Link from 'next/link';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-blue-600 text-white p-4 flex gap-4">
          <Link href="/form">Form Page</Link>
          <Link href="/data">Data Display Page</Link>
        </nav>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
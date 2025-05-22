'use client';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="flex justify-center space-x-10 mb-6 text-lg font-medium bg-purple-700 text-white py-3 px-4 rounded-md">
      <Link href="/" className="hover:underline">Form</Link>
      <Link href="/display" className="hover:underline">Data</Link>
    </nav>
  );
}


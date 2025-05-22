import '../styles/globals.css';

export const metadata = {
  title: 'Form App',
  description: 'Final Project',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
        <main className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
          {children}
        </main>
      </body>
    </html>
  );
}
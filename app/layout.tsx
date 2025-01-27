import '@/styles/globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Next.js Photo Album',
  description: 'A simple public photo album app built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="fixed top-0 left-0 w-full z-10 bg-blue-500 text-white py-4 text-center">
          <h1 className="text-3xl font-bold">
            <Link href='/'>
              Next Photo Album
            </Link>
          </h1>
        </header>
        <main className="flex-grow overflow-auto">{children}</main>
        <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 text-center z-10">
          <p className="text-sm">Created by Augusto Zangrandi</p>
        </footer>
      </body>
    </html>
  )
}

import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ['400', '600', '700']
});

export const metadata: Metadata = {
  title: "StudyBites",
  description: "Find the perfect study spot near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>
        <nav className="sticky top-0 bg-[#F0F0EC] shadow-md z-50">
        {/* <nav className="sticky top-0 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg z-50"> */}
          <div className="max-w-6xl mx-auto p-4">
            <div className="flex items-center gap-4">
                <Link 
                href="/" 
                className="text-2xl font-bold text-[#232323] hover:text-[#595959] transition-colors cursor-pointer"
                >
                StudyBites
                </Link>
              <div className="flex-1">
                <SearchBar />
              </div>
            </div>
          </div>
        </nav>
        
        <main className="min-h-[calc(100vh-8rem)]">
          {children}
        </main>

        <footer className="bg-[#F0F0EC] py-4 text-center text-sm text-gray-600">
          © 2025 Meigan Lu. All Rights Reserved.
        </footer>
      </body>
    </html>
  );
}
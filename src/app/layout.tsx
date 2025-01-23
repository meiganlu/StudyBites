import type { Metadata } from "next";
import { Sorts_Mill_Goudy } from "next/font/google";
import "./globals.css";
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

const eb = Sorts_Mill_Goudy({
  subsets: ["latin"],
  weight: ['400']
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
      <body className={eb.className}>
        {/* <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#cde8ae] to-[#FAF9F1]"> */}
        <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top,#C4C3E3_25%,#FAF9F1_100%)]">
          {/* Increased vertical padding and adjusted blur/opacity */}
          <nav className="sticky top-0 z-50 py-6">
            <div className="max-w-6xl mx-auto px-8">
              <div className="flex items-center gap-8">
                <Link 
                  href="/" 
                  className="text-3xl font-light text-[#292929] hover:text-[#4F4F4F]/80 transition-colors"
                >
                  StudyBites
                </Link>
                <div className="flex-1">
                  <SearchBar />
                </div>
              </div>
            </div>
          </nav>
          
          <main className="flex-1">
            {children}
          </main>

          <footer className="py-6">
            <div className="max-w-6xl mx-auto">
              <p className="text-center text-sm text-[#292929]/70">
                © 2025 Meigan Lu. All Rights Reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
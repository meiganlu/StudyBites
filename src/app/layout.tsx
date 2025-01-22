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
        {/* <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,#1E441E_0%,#F7F9F7_100%)]"> Moved gradient here */}
        <div className="min-h-screen bg-[#faf9f1]">
          {/* <nav className="sticky top-0 bg-[#BCC79E]/40 backdrop-blur-md shadow-md z-50">  */}
          <nav className="sticky top-0 bg-white/10 backdrop-blur-md shadow-md z-50">
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
          
          <main className="h-[calc(100vh-8rem)]">
            {children}
          </main>

          <footer className="py-4 text-center text-sm text-[#595959]">
            © 2025 Meigan Lu. All Rights Reserved.
          </footer>
        </div>
      </body>
    </html>
  );
}
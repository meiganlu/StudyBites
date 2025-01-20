import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SearchBar from '@/components/SearchBar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudySpot Finder",
  description: "Find the perfect place to study near you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="sticky top-0 bg-white shadow-md z-50">
          <div className="max-w-6xl mx-auto p-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-blue-600">StudySpot Finder</h1>
              <div className="flex-1">
                <SearchBar />
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </body>
    </html>
  );
}
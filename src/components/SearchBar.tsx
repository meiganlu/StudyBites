'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const router = useRouter();
 
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (location.trim()) {
      router.push(`/spots?q=${encodeURIComponent(location)}`);
    }
  };
 
  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="flex gap-2">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location (e.g., San Francisco)"
          className="flex-1 px-4 py-2 rounded-lg bg-[#595959]/10 border border-white/20 text-[#232323] placeholder-gray-400 transition-all outline-none focus:ring-2 focus:ring-gray-500/50"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-[#7E7E7E] hover:bg-[#9B9B9B] text-white rounded-lg transition-colors backdrop-blur-sm"
        >
          Search
        </button>
      </div>
    </form>
  );
 }
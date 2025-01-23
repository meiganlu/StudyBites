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
    <form onSubmit={handleSearch}>
      <div className="relative">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location (e.g., San Francisco)"
          className="w-full px-6 py-3 rounded-full bg-white/30 backdrop-blur-md
            border border-white/20 text-[#494949] placeholder-[#292929]/50
            focus:outline-none focus:bg-white/15 focus:border-white/30
            transition-all duration-300"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2
            px-6 py-2 rounded-full bg-[#292929]/90 hover:bg-[#292929]/70
            text-white text-sm transition-all duration-300
            backdrop-blur-md border border-white/20"
        >
          Search
        </button>
      </div>
    </form>
  );
}
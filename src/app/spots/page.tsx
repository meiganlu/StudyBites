'use client';

import { useSearchParams } from 'next/navigation';
import SpotList from '@/components/SpotList';
import Map from '@/components/Map';
import { useState } from 'react';
import { StudySpot } from '@/types';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');
  const [spots, setSpots] = useState<StudySpot[]>([]);
  
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Study Spots in {query}
        </h2>
        <div className="flex gap-2">
          <button 
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'list' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            List View
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              viewMode === 'map' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Map View
          </button>
        </div>
      </div>
      
      {viewMode === 'map' ? (
        <div className="h-[calc(100vh-12rem)] rounded-lg overflow-hidden shadow-lg">
          <Map searchQuery={query} onSpotsFound={setSpots} />
        </div>
      ) : (
        <SpotList spots={spots} />
      )}
    </div>
  );
}
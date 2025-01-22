'use client';

import { useSearchParams } from 'next/navigation';
import SpotList from '@/components/SpotList';
import Map from '@/components/Map';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { StudySpot } from '@/types';
import { Loader } from '@googlemaps/js-api-loader';
import { searchNearbyStudySpots } from '@/lib/places';

function LoadingState() {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <p className="text-[#515D5A]">Loading...</p>
    </div>
  );
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');
  const [spots, setSpots] = useState<StudySpot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setSpots([]);

    const loadSpots = async () => {
      try {
        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
          version: "weekly",
          libraries: ["places"]
        });

        await loader.load();
        const geocoder = new google.maps.Geocoder();
        const results = await geocoder.geocode({ address: query });

        if (results.results[0]) {
          const { location } = results.results[0].geometry;
          const map = new google.maps.Map(document.createElement('div'), {
            center: location,
            zoom: 13
          });

          const service = new google.maps.places.PlacesService(map);
          const newSpots = await searchNearbyStudySpots(map, service, query);
          setSpots(newSpots);
        }
      } catch (error) {
        console.error('Error loading spots:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSpots();
  }, [query]);

  const handleSpotsFound = useCallback((newSpots: StudySpot[]) => {
    setSpots(newSpots);
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#faf9f1]">
      <div className="max-w-6xl mx-auto p-2 sm:p-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-[#2C4A3E]">
            Study Spots in {query}
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm transition-colors ${
                viewMode === 'list' 
                  ? 'bg-[#BCC79E] text-[#2C4A3E]' 
                  : 'bg-[#E5E7DC] text-[#515D5A] hover:bg-[#CACFBA]'
              }`}
            >
              List View
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm transition-colors ${
                viewMode === 'map' 
                  ? 'bg-[#BCC79E] text-[#2C4A3E]' 
                  : 'bg-[#E5E7DC] text-[#515D5A] hover:bg-[#CACFBA]'
              }`}
            >
              Map View
            </button>
          </div>
        </div>
        
        {viewMode === 'map' ? (
          <div className="h-[60vh] sm:h-[70vh] rounded-xl overflow-hidden shadow-lg">
            <Map searchQuery={query} onSpotsFound={handleSpotsFound} />
          </div>
        ) : (
          <div className="h-[calc(100vh-12rem)]">
            <SpotList spots={spots} isLoading={isLoading} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingState />}>
      <SearchResults />
    </Suspense>
  );
}
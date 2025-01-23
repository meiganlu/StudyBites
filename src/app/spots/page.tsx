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
    <div className="h-[calc(90vh-8rem)] bg-[radial-gradient(ellipse_at_top,#C4C3E3_25%,#FAF9F1_100%)]">
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-[#292929] font-light">
            Study Spots in {query}
          </h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                viewMode === 'list' 
                  ? 'bg-[#292929]/90 backdrop-blur-md text-white' 
                  : 'bg-[#292929]/60 text-white/70 hover:bg-[#292929]/40'
              }`}
            >
              List View
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                viewMode === 'map' 
                  ? 'bg-[#292929]/90 backdrop-blur-md text-white' 
                  : 'bg-[#292929]/60 text-white/70 hover:bg-[#292929]/40'
              }`}
            >
              Map View
            </button>
          </div>
        </div>
        
        {viewMode === 'map' ? (
          <div className="h-[calc(100vh-12rem)] rounded-2xl overflow-hidden">
            <Map searchQuery={query} onSpotsFound={handleSpotsFound} />
          </div>
        ) : (
          <div className="h-[calc(100vh-12rem)] overflow-auto pr-2">
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
// src/app/spots/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import SpotList from '@/components/SpotList';
import Map from '@/components/Map';
import { useState, useEffect, useCallback } from 'react';
import { StudySpot } from '@/types';
import { Loader } from '@googlemaps/js-api-loader';
import { searchNearbyStudySpots } from '@/lib/places';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [viewMode, setViewMode] = useState<'list' | 'map'>('map');
  const [spots, setSpots] = useState<StudySpot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch spots independently of the map view
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
          <Map searchQuery={query} onSpotsFound={handleSpotsFound} />
        </div>
      ) : (
        <SpotList spots={spots} isLoading={isLoading} />
      )}
    </div>
  );
}
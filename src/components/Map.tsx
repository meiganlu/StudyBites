// src/components/Map.tsx
'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { StudySpot } from '@/types';
import { searchNearbyStudySpots } from '@/lib/places';

interface MapProps {
  searchQuery: string;
  onSpotsFound: (spots: StudySpot[]) => void;
}

export default function Map({ searchQuery, onSpotsFound }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchQuery) return;

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
      version: "weekly",
      libraries: ["places"]
    });

    loader.load().then(async () => {
      if (!mapRef.current) return;

      // First, geocode the search query to center the map
      const geocoder = new google.maps.Geocoder();
      
      try {
        console.log('Geocoding query:', searchQuery);
        const results = await geocoder.geocode({ address: searchQuery });
        
        if (results.results[0]) {
          console.log('Geocoding results:', results.results[0]);
          const { location } = results.results[0].geometry;
          
          const map = new google.maps.Map(mapRef.current, {
            center: location,
            zoom: 13
          });

          // Create Places Service and search for study spots
          const service = new google.maps.places.PlacesService(map);

          // Wait for the map to be fully loaded and bounds to be set
          google.maps.event.addListenerOnce(map, 'idle', async () => {
            try {
              console.log('Map is ready, searching for spots...');
              const spots = await searchNearbyStudySpots(map, service, searchQuery);
              console.log('Found spots:', spots);
              if (spots && spots.length > 0) {
                onSpotsFound(spots);

                // Add markers for each spot
                spots.forEach(spot => {
                  const marker = new google.maps.Marker({
                    position: spot.geometry.location,
                    map: map,
                    title: spot.name
                  });

                  const infoWindow = new google.maps.InfoWindow({
                    content: `
                      <div class="p-2">
                        <h3 class="font-semibold">${spot.name}</h3>
                        <p class="text-sm">${spot.vicinity}</p>
                        ${spot.rating ? `<p class="text-sm">Rating: ${spot.rating} ⭐</p>` : ''}
                      </div>
                    `
                  });

                  marker.addListener('click', () => {
                    infoWindow.open(map, marker);
                  });
                });
              } else {
                console.log('No spots found.');
              }
            } catch (error) {
              console.error('Error searching for spots:', error);
            }
          });
        } else {
          console.error('No geocoding results found');
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    }).catch(error => {
      console.error('Error loading Google Maps:', error);
    });
  }, [searchQuery, onSpotsFound]);

  return <div ref={mapRef} className="w-full h-full rounded-lg shadow-lg" />;
}
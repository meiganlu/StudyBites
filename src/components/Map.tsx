'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { StudySpot } from '@/types';
import { searchNearbyStudySpots } from '@/lib/places';

interface MapProps {
 searchQuery: string;
 onSpotsFound: (spots: StudySpot[]) => void;
}

export default function Map({ searchQuery, onSpotsFound }: MapProps) {
 const mapRef = useRef<HTMLDivElement>(null);
 const [currentMap, setCurrentMap] = useState<google.maps.Map | null>(null);
 const markersRef = useRef<google.maps.Marker[]>([]);

 const clearMarkers = () => {
   markersRef.current.forEach(marker => marker.setMap(null));
   markersRef.current = [];
 };

 useEffect(() => {
   if (!searchQuery) return;

   clearMarkers();
   onSpotsFound([]); 
   
   const loader = new Loader({
     apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
     version: "weekly",
     libraries: ["places"]
   });

   loader.load().then(async () => {
     if (!mapRef.current) return;

     try {
       const geocoder = new google.maps.Geocoder();
       const results = await geocoder.geocode({ address: searchQuery });
       
       if (results.results[0]) {
         const { location } = results.results[0].geometry;
         let mapToUse: google.maps.Map;

         if (currentMap) {
           currentMap.setCenter(location);
           currentMap.setZoom(13);
           mapToUse = currentMap;
         } else {
           const newMap = new google.maps.Map(mapRef.current, {
             center: location,
             zoom: 13
           });
           setCurrentMap(newMap);
           mapToUse = newMap;
         }

         const service = new google.maps.places.PlacesService(mapToUse);

         const spots = await searchNearbyStudySpots(mapToUse, service, searchQuery);
         if (spots && spots.length > 0) {
           onSpotsFound(spots);

            spots.forEach(spot => {
              const marker = new google.maps.Marker({
                position: spot.geometry.location,
                map: mapToUse,
                title: spot.name
              });

              const infoWindow = new google.maps.InfoWindow({
                content: `
                  <div style="padding: 12px; font-family: system-ui;">
                    <h3 style="font-size: 16px; color: #2C4A3E; font-weight: 500; margin-bottom: 4px;">
                      ${spot.name}
                    </h3>
                    <p style="font-size: 14px; color: #515D5A; margin: 4px 0;">
                      ${spot.vicinity}
                    </p>
                    ${spot.rating ? `
                      <p style="font-size: 14px; color: #515D5A; margin: 4px 0;">
                        Rating: ${spot.rating} / 5
                      </p>
                    ` : ''}
                  </div>
                `
              });

              marker.addListener('click', () => {
                infoWindow.open(mapToUse, marker);
              });
            });
         }
       }
     } catch (error) {
       console.error('Error:', error);
     }
   });

   return () => {
     clearMarkers();
   };
 }, [searchQuery, currentMap, onSpotsFound]);

 return (
  <div 
    ref={mapRef} 
    className="w-full h-full rounded-2xl shadow-lg" 
    style={{ maxHeight: '525px' }}
  />
);
}
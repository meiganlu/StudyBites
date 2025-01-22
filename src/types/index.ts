export interface StudySpot {
  id: string;
  name: string;
  vicinity: string;
  rating?: number;
  photos?: google.maps.places.PlacePhoto[];
  geometry: {
    location: google.maps.LatLng;
  };
  types?: string[];
  openNow?: boolean;
  priceLevel?: number;
  studyScore?: number;
  reviewMentions?: string[];
}
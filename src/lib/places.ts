// src/lib/places.ts
import { StudySpot } from '@/types';

interface PlaceWithReviewScore {
  place: google.maps.places.PlaceResult;
  studyScore: number;
  reviewMentions: string[];
}

// Add review-related scoring keywords
const STUDY_KEYWORDS = [
  'study',
  'studying',
  'quiet',
  'wifi',
  'wi-fi',
  'wireless',
  'outlet',
  'outlets',
  'plug',
  'student',
  'work',
  'working',
  'peaceful',
  'laptop',
  'tables',
  'space'
];

interface PlaceWithReviewScore {
  place: google.maps.places.PlaceResult;
  studyScore: number;
  reviewMentions: string[];
}

export async function searchNearbyStudySpots(
  map: google.maps.Map,
  service: google.maps.places.PlacesService,
  query: string
): Promise<StudySpot[]> {
  // Define places we never want to show
  const EXCLUDED_PLACES = [
    'dutch bros',
    'drive-thru',
    'drive through',
    'fast food',
    'restaurant',
  ];

  const requests = [
    // Libraries
    {
      query: `${query} public library university library`,
      type: 'library',
      radius: 10000
    },
    // Tea houses explicitly
    {
      query: `${query} tea house cafe study`,
      type: 'cafe',
      radius: 5000
    },
    // Student centers and lounges
    {
      query: `${query} student center student union`,
      type: 'point_of_interest',
      radius: 5000
    },
    // Cafes for studying
    {
      query: `${query} cafe coffee study`,
      type: 'cafe',
      radius: 5000
    },
    // Study spaces
    {
      query: `${query} study lounge study hall`,
      type: 'establishment',
      radius: 5000
    }
  ];

  try {
    // Get initial results
    const initialResults = await Promise.all(
      requests.map(req => 
        new Promise<google.maps.places.PlaceResult[]>((resolve) => {
          service.textSearch(
            {
              ...req,
              bounds: map.getBounds() || undefined
            },
            (results, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                resolve(results);
              } else {
                resolve([]);
              }
            }
          );
        })
      )
    );

    // Remove duplicates and excluded places first
    const filteredResults = initialResults
      .flat()
      .filter((place, index, self) => {
        if (!place.name || !place.place_id) return false;
        if (index !== self.findIndex(p => p.place_id === place.place_id)) return false;
        
        const name = place.name.toLowerCase();
        return !EXCLUDED_PLACES.some(excluded => name.includes(excluded.toLowerCase()));
      });

    // Get detailed review data for each place
    const placesWithReviews = await Promise.all(
      filteredResults.map(place => 
        new Promise<PlaceWithReviewScore>((resolve) => {
          service.getDetails(
            {
              placeId: place.place_id!,
              fields: ['reviews', 'rating', 'user_ratings_total']
            },
            (details, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && details) {
                const reviews = details.reviews || [];
                let studyScore = 0;
                const reviewMentions: string[] = [];

                // Analyze each review
                reviews.forEach(review => {
                  const text = review.text.toLowerCase();
                  STUDY_KEYWORDS.forEach(keyword => {
                    if (text.includes(keyword)) {
                      studyScore += 1;
                      if (!reviewMentions.includes(keyword)) {
                        reviewMentions.push(keyword);
                      }
                    }
                  });
                });

                // Normalize score based on number of reviews
                const normalizedScore = reviews.length > 0 ? 
                  (studyScore / reviews.length) * 5 : 0;

                resolve({
                  place,
                  studyScore: normalizedScore,
                  reviewMentions
                });
              } else {
                resolve({
                  place,
                  studyScore: 0,
                  reviewMentions: []
                });
              }
            }
          );
        })
      )
    );

    // Convert to StudySpots and include review data
    const spots: StudySpot[] = placesWithReviews
      .map(({ place, studyScore, reviewMentions }) => ({
        id: place.place_id!,
        name: place.name!,
        vicinity: place.formatted_address || '',
        rating: place.rating,
        photos: place.photos,
        geometry: {
          location: place.geometry!.location!
        },
        types: place.types,
        openNow: place.opening_hours?.isOpen?.() || false,
        priceLevel: place.price_level,
        studyScore,
        reviewMentions
      }));

    // Updated sorting with review analysis
    return spots.sort((a, b) => {
      const getScore = (spot: StudySpot) => {
        let score = 0;
        const name = spot.name.toLowerCase();
        const types = spot.types || [];

        // Base score from place type
        if (types.includes('library')) score += 15;
        if (name.includes('student center') || 
            name.includes('student union')) score += 15;
        if (name.includes('tea house') || 
            name.includes('tea shoppe')) score += 12;
        
        // Add review-based study score
        score += (spot.studyScore || 0) * 3;

        // Consider rating
        score += (spot.rating || 0) * 2;

        return score;
      };

      return getScore(b) - getScore(a);
    });

  } catch (error) {
    console.error('Error searching for study spots:', error);
    return [];
  }
}
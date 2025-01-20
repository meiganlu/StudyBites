import { StudySpot } from '@/types';

interface SpotCardProps {
  spot: StudySpot;
}

// src/components/SpotCard.tsx
export default function SpotCard({ spot }: SpotCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold">{spot.name}</h3>
      <p className="text-gray-600 mt-1">{spot.vicinity}</p>
      
      {/* Study Score Indicator */}
      {spot.studyScore && spot.studyScore > 0 && (
        <div className="mt-2">
          <div className="flex items-center">
            <span className="text-sm font-medium">Study Score:</span>
            <div className="ml-2 flex">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i}
                  className={`h-2 w-2 rounded-full mx-0.5 ${
                    i < Math.round(spot.studyScore ?? 0) 
                      ? 'bg-blue-500' 
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Review Keywords */}
      {spot.reviewMentions && spot.reviewMentions.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {spot.reviewMentions.map((keyword) => (
            <span 
              key={keyword}
              className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
            >
              {keyword}
            </span>
          ))}
        </div>
      )}

      {/* Regular rating */}
      {spot.rating && (
        <div className="mt-2">
          <span className="text-sm bg-blue-100 px-2 py-1 rounded-full">
            {spot.rating} ⭐
          </span>
        </div>
      )}
    </div>
  );
}
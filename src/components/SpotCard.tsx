import { StudySpot } from '@/types';

interface SpotCardProps {
  spot: StudySpot;
}

export default function SpotCard({ spot }: SpotCardProps) {
  return (
    <div className="bg-[#E5E7DC] hover:bg-[#CACFBA] rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <h3 className="text-base sm:text-lg font-semibold text-[#2C4A3E] truncate">
        {spot.name}
      </h3>
      <p className="text-[#515D5A] text-sm mt-1 sm:mt-2 truncate">
        {spot.vicinity}
      </p>
      
      {spot.studyScore && spot.studyScore > 0 && (
        <div className="mt-2 sm:mt-3">
          <div className="flex items-center">
            <span className="text-xs sm:text-sm font-medium text-[#2C4A3E]">Study Score:</span>
            <div className="ml-2 flex">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i}
                  className={`h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full mx-0.5 ${
                    i < Math.round(spot.studyScore ?? 0) 
                      ? 'bg-[#86A789]' 
                      : 'bg-[#D2D7C2]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-3">
        {spot.rating && (
          <span className="text-xs sm:text-sm bg-[#BCC79E] px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[#2C4A3E] whitespace-nowrap">
            {spot.rating} ⭐
          </span>
        )}

        {spot.reviewMentions && spot.reviewMentions.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {spot.reviewMentions.slice(0, window.innerWidth < 640 ? 2 : 3).map((keyword) => (
              <span 
                key={keyword}
                className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#BCC79E] text-[#2C4A3E] text-xs rounded-full"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
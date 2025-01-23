import { StudySpot } from '@/types';
import Link from 'next/link';

interface SpotCardProps {
 spot: StudySpot;
 types?: string[];
}

function generateStudyKeywords(spot: StudySpot): string[] {
  const keywords: string[] = [];
  
  // Base keywords on place type and details
  if (spot.types?.includes('library')) {
    keywords.push('quiet', 'wifi', 'study rooms');
  }
  
  if (spot.types?.includes('cafe')) {
    keywords.push('wifi', 'outlets', 'casual');
  }

  // Add keywords based on name/type matches
  if (spot.name.toLowerCase().includes('study room')) {
    keywords.push('quiet', 'private');
  }

  if (spot.name.toLowerCase().includes('free wifi')) {
    keywords.push('wifi');
  }
  
  if (spot.name.toLowerCase().includes('24')) {
    keywords.push('24/7');
  }

  return keywords;
}

export default function SpotCard({ spot }: SpotCardProps) {
 const googleMapsUrl = `https://www.google.com/maps/place/?q=place_id:${spot.id}`;
 const studyKeywords = generateStudyKeywords(spot);

 return (
   <Link
     href={googleMapsUrl}
     target="_blank"
     rel="noopener noreferrer" 
     className="block hover:scale-[1.02] transition-transform duration-300"
   >
     <div className="bg-white/40 hover:bg-white/50 rounded-xl p-4 sm:p-5 shadow-md hover:shadow-lg transition-all duration-300">
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
                       ? 'bg-[#7c79d1]' 
                       : 'bg-white/90'
                   }`}
                 />
               ))}
             </div>
           </div>
         </div>
       )}

       <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-3">
         {spot.rating && (
           <span className="text-xs sm:text-sm bg-[#9A98DB]/60 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[#292929] whitespace-nowrap">
             {spot.rating} /5
           </span>
         )}

         {spot.reviewMentions && spot.reviewMentions.length > 0 && (
           <div className="flex flex-wrap gap-1">
           {studyKeywords.map((keyword) => (
             <span 
               key={keyword}
               className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#9A98DB]/25 text-[#292929] text-xs rounded-full"
             >
               {keyword}
             </span>
           ))}
         </div>
       )}
       </div>

       <div className="flex items-center justify-end mt-3 text-[#515D5A] text-xs">
         Open in Google →
       </div>
     </div>
   </Link>
 );
}
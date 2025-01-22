// src/components/SpotList.tsx
import { StudySpot } from '@/types';
import SpotCard from './SpotCard';
import { useState, useEffect } from 'react';

interface SpotListProps {
  spots: StudySpot[];
  isLoading: boolean;
}

export default function SpotList({ spots, isLoading }: SpotListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  // Adjust spots per page based on screen size
  const [spotsPerPage, setSpotsPerPage] = useState(6);

  // Update spots per page based on window size
  useEffect(() => {
    function handleResize() {
      // Mobile: 2 spots, Tablet: 4 spots, Desktop: 6 spots
      if (window.innerWidth < 640) {
        setSpotsPerPage(2);
      } else if (window.innerWidth < 1024) {
        setSpotsPerPage(4);
      } else {
        setSpotsPerPage(6);
      }
    }

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading) {
    return (
      <div className="text-center py-4 sm:py-6">
        <div className="animate-pulse">
          <p className="text-[#515D5A]">Loading study spots...</p>
        </div>
      </div>
    );
  }

  if (spots.length === 0) {
    return (
      <div className="text-center py-4 sm:py-6">
        <p className="text-[#515D5A]">No study spots found. Try adjusting your search.</p>
      </div>
    );
  }

  const indexOfLastSpot = currentPage * spotsPerPage;
  const indexOfFirstSpot = indexOfLastSpot - spotsPerPage;
  const currentSpots = spots.slice(indexOfFirstSpot, indexOfLastSpot);
  const totalPages = Math.ceil(spots.length / spotsPerPage);

  return (
    <div className="min-h-full max-h-screen overflow-y-auto px-2 sm:px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4">
        {currentSpots.map(spot => (
          <SpotCard key={spot.id} spot={spot} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-colors ${
              currentPage === 1
                ? 'bg-[#E5E7DC] text-[#515D5A] cursor-not-allowed'
                : 'bg-[#BCC79E] text-[#2C4A3E] hover:bg-[#A5B586]'
            }`}
          >
            Previous
          </button>
          
          <span className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-[#2C4A3E]">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-colors ${
              currentPage === totalPages
                ? 'bg-[#E5E7DC] text-[#515D5A] cursor-not-allowed'
                : 'bg-[#BCC79E] text-[#2C4A3E] hover:bg-[#A5B586]'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
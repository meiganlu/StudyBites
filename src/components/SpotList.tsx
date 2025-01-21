// src/components/SpotList.tsx
import { StudySpot } from '@/types';
import SpotCard from './SpotCard';

interface SpotListProps {
  spots: StudySpot[];
  isLoading: boolean;
}

export default function SpotList({ spots, isLoading }: SpotListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-pulse">
          <p className="text-gray-600">Loading study spots...</p>
        </div>
      </div>
    );
  }

  if (spots.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No study spots found. Try adjusting your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {spots.map(spot => (
        <SpotCard key={spot.id} spot={spot} />
      ))}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useClientLastUpdatedDate } from '@/utils/fileUtils';

/**
 * Hook to get a stable last updated date that persists between refreshes
 * @param key Unique identifier for this page/component
 * @returns A formatted date string that stays consistent between page refreshes
 */
export function useLastUpdated(key: string): string {
  const [lastUpdated, setLastUpdated] = useState('');
  
  useEffect(() => {
    // Get the stable date on component mount
    setLastUpdated(useClientLastUpdatedDate(key));
  }, [key]);
  
  return lastUpdated;
}

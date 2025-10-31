
import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';

export function getLastUpdatedDate(filePath: string): string {
  try {
    // In development mode, get the file stats directly
    if (import.meta.env.DEV) {
      const stats = fs.statSync(path.resolve(__dirname, '..', filePath));
      return format(stats.mtime, 'dd-MM-yyyy HH:mm:ss');
    } 
    // In production, use a fixed timestamp or build-time value
    else {
      // For production, we'll use a fixed timestamp from the build process
      // This prevents the timestamp from changing on each page refresh
      const buildTime = import.meta.env.VITE_BUILD_TIME || new Date().toISOString();
      return format(new Date(buildTime), 'dd-MM-yyyy HH:mm:ss');
    }
  } catch (error) {
    console.error('Error getting file last modified date:', error);
    return format(new Date(), 'dd-MM-yyyy HH:mm:ss');
  }
}

// For client-side usage, we'll create a function that can use localStorage
// to persist the last updated date between sessions
export function useClientLastUpdatedDate(key: string): string {
  try {
    // Try to get from localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`last_updated_${key}`);
      if (stored) {
        return stored;
      }
    }
    
    // If not found in localStorage, generate and store a new one
    const now = format(new Date(), 'dd-MM-yyyy HH:mm:ss');
    if (typeof window !== 'undefined') {
      localStorage.setItem(`last_updated_${key}`, now);
    }
    return now;
  } catch (error) {
    console.error('Error with client last updated date:', error);
    return format(new Date(), 'dd-MM-yyyy HH:mm:ss');
  }
}

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Timestamp } from "firebase/firestore"; // Import Timestamp

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper function to format Firestore Timestamps or Dates
export function formatTimestampForDisplay(timestamp: Timestamp | Date | null | undefined): string {
  if (!timestamp) return 'Date unavailable';

  const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;

  // Example formatting: "Jan 1, 2024, 10:30 AM"
  // Adjust options as needed
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    // timeZoneName: 'short' // Optional: include timezone
  });
}

// Example usage for relative time (like "2 hours ago") - more complex
export function formatRelativeTime(timestamp: Timestamp | Date | null | undefined): string {
    if (!timestamp) return 'Date unavailable';
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
    const now = new Date();
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return `Just now`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    // Fallback to absolute date for older posts
    return formatTimestampForDisplay(date);
}

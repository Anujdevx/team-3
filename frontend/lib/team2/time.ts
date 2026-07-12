/**
 * Utility to format seconds into a HH:MM:SS string.
 */
export function formatSecondsToHHMMSS(seconds: number): string {
  const hours = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${hours}:${mins}:${secs}`;
}

/**
 * Formats a Date object or timestamp as a YYYY-MM-DD string in the LOCAL timezone.
 * Avoids UTC timezone shift bugs where toISOString() returns yesterday's date late at night or early morning.
 */
export function formatLocalDate(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formats a YYYY-MM-DD string into a human-readable date representation.
 * e.g., "Monday, Aug 3" or "Aug 3, 2026"
 */
export function formatDisplayDate(
  dateStr: string,
  options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' }
): string {
  if (!dateStr) return '';
  // Parse YYYY-MM-DD as local date by appending T00:00:00
  const date = new Date(`${dateStr}T00:00:00`);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString('en-US', options);
}

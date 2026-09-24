// Not Intl: Spanish would render "65 $", and prices must match across both languages.
export function formatPrice(priceCad: number): string {
  return `$${Math.round(priceCad)}`;
}

// "45 min", "1 h", "1 h 30 min". Same abbreviations in both languages.
export function formatDuration(durationMinutes: number): string {
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} h`;
  return `${hours} h ${minutes} min`;
}

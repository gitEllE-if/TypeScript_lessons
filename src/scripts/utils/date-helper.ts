export function dateToLocaleString(date: Date): string {
  return date.toLocaleDateString('ru').split('.').reverse().join('-');
}

export function dateToUnixStamp(date: Date): number {
  return date.getTime() / 1000;
}

export function calculateDifferenceInDays(startDate: Date, endDate: Date): number {
  const difference = endDate.getTime() - startDate.getTime();
  return Math.floor(difference / (1000 * 60 * 60 * 24))
}

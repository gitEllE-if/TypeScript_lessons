export function dateToLocaleString(date: Date): string {
  return date.toLocaleDateString('ru').split('.').reverse().join('-');
}

export function dateToUnixStamp(date: Date): number {
  return date.getTime() / 1000;
}
export function formatDate(dateToFormat: Date): string {
  return dateToFormat.toLocaleDateString('ru').split('.').reverse().join('-');
}
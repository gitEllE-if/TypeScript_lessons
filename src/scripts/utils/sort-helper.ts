import { Place } from '../domain/place';

export function ascendingPriceCompare(a: Place, b: Place): number {
  return a.price - b.price;
}

export function descendingPriceCompare(a: Place, b: Place): number {
  return b.price - a.price;
}

export function ascendingRemotenessCompare(a: Place, b: Place): number {
  return a.remoteness - b.remoteness;
}

export const SORTING = {
  "ascendingPrice": ascendingPriceCompare,
  "descendingPrice": descendingPriceCompare,
  "ascendingRemoteness": ascendingRemotenessCompare
}

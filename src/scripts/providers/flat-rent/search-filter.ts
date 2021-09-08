import { BookFilter, GetFilter, SearchFilter } from '../../domain/search-filter';

export type SearchFilter_flat = Pick<SearchFilter,
  'checkin' | 'checkout' | 'city' | 'price' | 'coordinates'>

export interface BookFilter_flat extends BookFilter {
  coordinates: string
}

export interface GetFilter_flat extends GetFilter {
  checkin: Date;
  checkout: Date;
}

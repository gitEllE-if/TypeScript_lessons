import { BookFilter, GetFilter, SearchFilter } from '../../domain/search-filter';

export type SearchFilterFlat = Pick<SearchFilter,
  'checkin' | 'checkout' | 'city' | 'price' | 'coordinates'>

export interface BookFilterFlat extends BookFilter {
  coordinates: string
}

export interface GetFilterFlat extends GetFilter {
  checkin: Date;
  checkout: Date;
}

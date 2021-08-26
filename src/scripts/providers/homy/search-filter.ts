import { BookFilter, GetFilter, SearchFilter } from '../../domain/search-filter';

export interface SearchFilter_homy extends Pick<SearchFilter,
  'checkin' | 'checkout' | 'coordinates'> {
  price?: number;
}

export type BookFilter_homy = BookFilter

export type GetFilter_homy = GetFilter

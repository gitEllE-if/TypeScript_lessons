import { BookFilter, GetFilter, SearchFilter } from '../../domain/search-filter';

export interface SearchFilterHomy extends Pick<SearchFilter,
  'checkin' | 'checkout' | 'coordinates'> {
  price?: number;
}

export type BookFilterHomy = BookFilter

export type GetFilterHomy = GetFilter

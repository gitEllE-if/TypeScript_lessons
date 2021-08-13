import { Place } from './place';
import { SearchFilter, BookFilter, GetFilter } from './search-filter';

export interface Provider {
  find(filter: SearchFilter): Promise<Place[]>;
  get(filter: GetFilter): Promise<Place>;
  book(filter: BookFilter): Promise<Place>;
}

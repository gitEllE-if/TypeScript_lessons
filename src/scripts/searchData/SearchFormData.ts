import { ProviderName } from '../providers';

export interface SearchFormData {
  city: string;
  coordinates: string;
  price: number;
  checkin: Date;
  checkout: Date;
  provider: ProviderName[];
}

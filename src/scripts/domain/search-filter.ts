export interface SearchFilter {
  checkin: Date;
  checkout: Date;
  id: string;
  city: string;
  price: number;
  coordinates: string;
}

export interface BookFilter {
  checkin: Date;
  checkout: Date;
  id: string;
}

export interface GetFilter {
  id: string;
  coordinates: string;
}

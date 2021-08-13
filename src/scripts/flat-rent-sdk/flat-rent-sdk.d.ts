export interface SearchParameters {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  priceLimit: number;
}

export type BookParameters = [string, Date, Date];

export interface Flat {
  id: string;
  title: string;
  details: string;
  photos: string[];
  coordinates: [number, number];
  bookedDates: number[];
  price?: number;
  totalPrice?: number;
}

export class FlatRentSdk {

  get(id: string): Promise<Flat>

  search(parameters: SearchParameters): Promise<Flat[]>

  book(...bookParameters: BookParameters): Promise<number>
}

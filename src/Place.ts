export interface Place {
  id: number;
  image: string;
  name: string;
  description: string;
  remoteness: number;
  bookedDates: number[];
  price: number;
}

export type PartPlace = Omit<Place, 'description' | 'remoteness' | 'bookedDates' | 'price'>

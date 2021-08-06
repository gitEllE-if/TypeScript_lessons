import { Place } from './Place';

export type PartPlace = Omit<Place, 'description' | 'remoteness' | 'bookedDates' | 'price'>;

export type Provider = 'homy' | 'flat-rent';
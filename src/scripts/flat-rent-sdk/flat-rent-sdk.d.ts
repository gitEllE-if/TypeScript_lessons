export interface SearchParameters {
    city: string;
    checkInDate: Date;
    checkOutDate: Date;
    priceLimit: number;
}

export interface Flat {
    id: string;
    title: string;
    details: string;
    photos: string[];
    coordinates: number[];
    bookedDates: Date[];
    price: number;
}

export function get(id: string): Promise<Flat>

export function search(parameters: SearchParameters): Flat[]

export function book(flatId: number, checkInDate: Date, checkOutDate: Date): number

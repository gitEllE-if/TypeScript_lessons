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
    price?: number;
    totalPrice?: number;
}

export class FlatRentSdk {

    get(id: string): Promise<Flat>

    search(parameters: SearchParameters): Promise<Flat[]>

    book(flatId: number, checkInDate: Date, checkOutDate: Date): number
}
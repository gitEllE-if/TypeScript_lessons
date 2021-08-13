export interface PlaceErrorResponse {
    name: string;
    message: string;
    code: number;
}

export type PlaceListResponse = Place[] | PlaceErrorResponse;

export type PlaceResponse = Place | PlaceErrorResponse;

export interface Place {
    id: number;
    image: string;
    name: string;
    description: string;
    remoteness: number;
    bookedDates: number[];
    price: number;
}
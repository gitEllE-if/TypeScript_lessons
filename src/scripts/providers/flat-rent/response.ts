import { Flat } from '../../flat-rent-sdk/flat-rent-sdk';

export interface PlaceErrorResponse {
    name: string;
    message: string;
    code: number;
}

export type Place = Flat;

export type PlaceListResponse = Place[] | PlaceErrorResponse;

export type PlaceResponse = Place | PlaceErrorResponse;

import { Place } from '../Place';

export interface ErrorResponse {
  name: string;
  message: string;
  code: number
}

export interface Request<T> {
  (url: string): Promise<T>
}

export const get: Request<Place[]> = url => {
  return fetch(url, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => {
      return response.text();
    })
    .then<Place[] | ErrorResponse>((response) => {
      return JSON.parse(response);
    })
    .then<Place[]>((response) => {
      if ((<ErrorResponse>response).code) {
        throw new Error((<ErrorResponse>response).message)
      }
      return <Place[]>response
    })
}

export const patch: Request<Place> = url => {
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      return response.text();
    })
    .then<Place | ErrorResponse>((response) => {
      return JSON.parse(response);
    })
    .then<Place>((response) => {
      if ((<ErrorResponse>response).code) {
        throw new Error((<ErrorResponse>response).message)
      }
      return <Place>response
    })
}

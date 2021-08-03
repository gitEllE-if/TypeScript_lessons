import { Place } from '../Place';

export interface BookResponce {
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
    .then<Place[]>((response) => {
      return JSON.parse(response);
    })
}

export const patch: Request<Place | BookResponce> = url => {
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      return response.text();
    })
    .then<Place | BookResponce>((response) => {
      return JSON.parse(response);
    })
}

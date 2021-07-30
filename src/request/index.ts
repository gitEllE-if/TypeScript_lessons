import { Place } from '../Place';

export function get(url: string): Promise<any> {
  return fetch(url, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => {
      return response.text();
    })
    .then<Place | Place[]>((response) => {
      return JSON.parse(response);
    })
}

export function patch(url: string): Promise<any> {
  return fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      return JSON.parse(response);
    })
}

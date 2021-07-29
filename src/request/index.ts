export function get(url: string): Promise<any> {
  return fetch(url)
    .then((response) => {
      return response.text();
    })
    .then((response) => {
      return JSON.parse(response);
    })
}

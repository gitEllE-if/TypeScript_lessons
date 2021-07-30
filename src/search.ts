import { SearchData } from './search-class';
import { dateToUnixStamp } from './date-helper';
import { get } from './request';
import { Place } from './Place';
import { Callback, renderCallback } from './search-results-helper';

export function search(event: Event): void {
  const formEl = <HTMLFormElement>event.target;
  const formData = new FormData(formEl);
  event.preventDefault();

  for (const elem of formEl.elements) {
    if ((<HTMLFormElement>elem).disabled == true) {
      formData.set((<HTMLFormElement>elem).name, (<HTMLFormElement>elem).value);
    }
  }
  const searchData = new SearchData(formData);
  putSearchResult(searchData, renderCallback);
}

function putSearchResult(searchData: SearchData, renderCallback: Callback) {
  const { searchFormData } = searchData;
  let url = `/api/places?&checkInDate=${dateToUnixStamp(searchFormData.checkin)}&` +
    `checkOutDate=${dateToUnixStamp(searchFormData.checkout)}&` +
    `coordinates=${searchFormData.coordinates}`;
  url += searchFormData.price === null ? '' : `&maxPrice=${searchFormData.price}`;
  get(url)
    .then((places: Place[]) => {
      renderCallback(null, places)
    })
    .catch((error) => {
      renderCallback(error)
    })
}
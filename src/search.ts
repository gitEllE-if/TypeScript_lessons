import { SearchData } from './search-class';
import { renderSearchResultsBlock } from './search-results';
import { dateToUnixStamp } from './date-helper';
import { get } from './request';
import { Place } from './Place';

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
  const callback: SearchCallback = (error, place) => {
    if (error == null && place != null) {
      renderSearchResultsBlock(place);
    } else {
      console.warn('Fail', error)
    }
  }
  putSearchResult(searchData, callback);
}

interface SearchCallback {
  (error?: Error, place?: Place[]): void
}

function putSearchResult(searchData: SearchData, callback: SearchCallback) {
  get(`/api/places?&checkInDate=${dateToUnixStamp(searchData.searchFormData.checkin)}&` +
    `checkOutDate=${dateToUnixStamp(searchData.searchFormData.checkout)}&` +
    `coordinates=${searchData.searchFormData.coordinates}`)
    .then((place: Place[]) => {
      callback(null, place)
    })
    .catch((error) => {
      callback(error)
    })
}

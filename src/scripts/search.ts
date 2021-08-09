import { putSearchResults, renderEmptyOrErrorSearchBlock } from './search-results';
import { SearchData } from './searchData/searchData-class';
import { dateToUnixStamp } from './date-helper';
import { get } from './request';
import { Place } from './Place';
import { user } from './user'

export function search(event: Event): void {
  const formEl = <HTMLFormElement>event.target;
  const formData = new FormData(formEl);
  event.preventDefault();

  for (const elem of formEl.elements) {
    if ((<HTMLFormElement>elem).disabled == true) {
      formData.set((<HTMLFormElement>elem).name, (<HTMLFormElement>elem).value);
    }
  }
  delete user.searchData;
  user.searchData = new SearchData(formData);
  let url = `/api/places?&checkInDate=${dateToUnixStamp(user.searchData.checkin)}&` +
    `checkOutDate=${dateToUnixStamp(user.searchData.checkout)}&` +
    `coordinates=${user.searchData.coordinates}`;
  url += user.searchData.price === null ? '' : `&maxPrice=${user.searchData.price}`;
  get(url)
    .then((places: Place[]) => {
      places.length ?
        putSearchResults(places) :
        renderEmptyOrErrorSearchBlock('По вашему запросу ничего не найдено');
    })
    .catch((error) => {
      renderEmptyOrErrorSearchBlock(`Запрос не удался. ${error}`);
    })
}

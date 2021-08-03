import { putSearchResults, renderEmptyOrErrorSearchBlock } from './search-results';
import { Callback } from './Callback';
import { SearchData } from './searchData/searchData-class';
import { dateToUnixStamp } from './date-helper';
import { get } from './request';
import { Place } from './Place';
import { user } from './user'

export const searchCallback: Callback<Place[]> = (error, places) => {
  if (error == null && places != null) {
    if (places.length) {
      putSearchResults(places);
    }
    else {
      renderEmptyOrErrorSearchBlock('По вашему запросу ничего не найдено');
    }
  } else {
    console.warn('Fail', error);
    renderEmptyOrErrorSearchBlock('Произошла ошибка. Заполните корректно поля формы или попробуйте немного позже');
  }
}

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
      searchCallback(null, places)
    })
    .catch((error) => {
      searchCallback(error)
    })
}

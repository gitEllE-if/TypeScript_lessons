import { putSearchResultsItems, renderEmptyOrErrorSearchBlock, renderSearchResultsBlock } from './search-results';
import { Callback } from './Callback';
import { SearchData } from './searchData/searchData-class';
import { dateToUnixStamp } from './date-helper';
import { get } from './request';
import { Place } from './Place';
import { user } from './user'
import { flatRentSdk } from './flat-rent-sdk';
import { Flat } from './flat-rent-sdk/flat-rent-sdk';

export const searchCallback: Callback<Place[] | Flat[]> = (error, places) => {
  if (error == null && places != null) {
    if (places.length) {
      putSearchResultsItems(places);
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
  renderSearchResultsBlock();
  if (user.searchData.provider.includes('homy')) {
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
  if (user.searchData.provider.includes('flat-rent')) {
    flatRentSdk.search({
      city: user.searchData.city,
      checkInDate: user.searchData.checkin,
      checkOutDate: user.searchData.checkout,
      priceLimit: user.searchData.price
    })
      .then((flats: Flat[]) => {
        searchCallback(null, flats)
      })
      .catch((error) => {
        searchCallback(error)
      })
  }
}

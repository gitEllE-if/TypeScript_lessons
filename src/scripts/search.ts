import {
  delSearchResultsItems, putSearchResultsItems,
  renderEmptyOrErrorSearchBlock, renderSearchResultsBlock
} from './search-results';
import { SearchData } from './searchData/searchData-class';
import { Place } from './domain/place';
import { user } from './user'
import { PROVIDERS } from './providers';
import { ascendingPriceCompare, SORTING } from './utils/sort-helper';

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
  const providersArr = [];
  for (const item of user.searchData.provider) {
    providersArr.push(PROVIDERS[item].find(user.searchData));
  }
  Promise.all(providersArr)
    .then((results) => {
      const places: Place[] = [].concat(...results);
      places.sort(ascendingPriceCompare);
      if (places.length) {
        document.querySelector('#search-results-sorting')
          .addEventListener('change', putSortingSearchResultsItems.bind(null, places));
        putSearchResultsItems(places);
      }
      else {
        renderEmptyOrErrorSearchBlock('По вашему запросу ничего не найдено');
      }
    })
    .catch((error) => {
      renderEmptyOrErrorSearchBlock(`Запрос не удался. ${error}`);
    })
}

export function putSortingSearchResultsItems(places: Place[], event: Event): void {
  const sortEl = <HTMLSelectElement>event.target;
  if (sortEl && sortEl.options) {
    places.sort(SORTING[sortEl.options[sortEl.options.selectedIndex].value]);
    delSearchResultsItems(places);
    putSearchResultsItems(places);
  }
}

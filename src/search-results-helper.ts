import { renderSearchResultsBlock, renderEmptyOrErrorSearchBlock } from './search-results';
import { renderUserBlock } from './user-render';
import { PartPlace, Place } from './Place';
import { placeStorage } from './storage';
import { PlaceStorage } from './storage/storage-class';
import { user } from './user'

export interface Callback {
  (error?: Error, place?: Place[]): void
}

function toggleFavoriteItem(place: Place, placeStorage: PlaceStorage): void {
  const { description, price, remoteness, bookedDates, ...rest } = place;
  const partPlace: PartPlace = { ...rest };
  placeStorage.toggleItem(partPlace);
  document.getElementById(`${place.id}`).classList.toggle('active');
  user.favoritesAmount = placeStorage.itemAmount();
  renderUserBlock(user.userData.userName, user.userData.avatarUrl, user.favoritesAmount);
}

export const renderCallback: Callback = (error, places) => {
  if (error == null && places != null) {
    if (places.length) {
      renderSearchResultsBlock(places, placeStorage, toggleFavoriteItem);
    }
    else {
      renderEmptyOrErrorSearchBlock('По вашему запросу ничего не найдено');
    }
  } else {
    console.warn('Fail', error);
    renderEmptyOrErrorSearchBlock('Произошла ошибка. Заполните корректно поля формы или попробуйте немного позже');
  }
}

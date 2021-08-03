import { renderUserFavoriteBlock } from './user-render';
import { PartPlace, Place } from './Place';
import { placeStorage } from './storage';
import { user } from './user'

export function toggleFavorite(place: Place): void {
  const { description, price, remoteness, bookedDates, ...rest } = place;
  const partPlace: PartPlace = { ...rest };
  placeStorage.toggleItem(partPlace);
  document.getElementById(`favorite${place.id}`).classList.toggle('active');
  user.favoritesAmount = placeStorage.itemAmount();
  renderUserFavoriteBlock(user.favoritesAmount);
}
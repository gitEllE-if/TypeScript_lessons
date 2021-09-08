import { renderUserFavoriteBlock } from './user-render';
import { Place } from './domain/place';
import { PartPlace } from './domain/place';
import { placeStorage } from './storage';
import { user } from './user'

export function toggleFavorite(place: Place): void {
  const { name, image } = place;
  const partPlace: PartPlace = { id: place.id, name: name, image: image };
  placeStorage.toggleItem(partPlace);
  document.getElementById(`favorite${place.id}`)?.classList.toggle('active');
  user.favoritesAmount = placeStorage.itemAmount();
  renderUserFavoriteBlock(user.favoritesAmount);
}

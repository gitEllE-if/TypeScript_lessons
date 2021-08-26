import { renderToast } from './lib';
import { Place } from './domain/place';
import { user } from './user';
import { PROVIDERS } from './providers';

export function book(place: Place): void {
  if (!place.originalId || !user.searchData) {
    return;
  }
  user.searchData.id = place.originalId;
  PROVIDERS[place.getProvider()]?.book(user.searchData)
    .then((place) => {
      renderToast({ text: `Успешно забронировано: ${place.name}`, type: 'success' });
    })
    .catch((error: any) => {
      renderToast({ text: `Не удалось забронировать: ${error}`, type: 'error' });
    })
}

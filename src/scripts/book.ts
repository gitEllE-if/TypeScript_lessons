import { renderToast } from './lib';
import { dateToUnixStamp } from './date-helper';
import { patch } from './request';
import { Place } from './Place';
import { user } from './user';

export function book(place: Place): void {
  const url = `/api/places/${place.id}` +
    `?checkInDate=${dateToUnixStamp(user?.searchData.checkin)}&` +
    `checkOutDate=${dateToUnixStamp(user?.searchData.checkout)}`;

  patch(url)
    .then((place) => {
      renderToast(
        { text: `Успешно забронировано: ${place.name}`, type: 'success' },
        { name: null, handler: null }
      );
    })
    .catch((error) => {
      renderToast(
        { text: `Не удалось забронировать: ${error}`, type: 'error' },
        { name: null, handler: null }
      );
    })
}

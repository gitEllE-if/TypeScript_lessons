import { renderToast } from './lib';
import { dateToUnixStamp } from './date-helper';
import { patch, BookResponce } from './request';
import { Callback } from './Callback';
import { Place } from './Place';
import { user } from './user';

const bookCallback: Callback<Place | BookResponce> = (error, place) => {
  if (error == null && place != null) {
    if ((<Place>place).id) {
      renderToast(
        { text: `Успешно забронировано: ${place.name}`, type: 'success' },
        { name: null, handler: null }
      );
    }
    else {
      renderToast(
        { text: `Не удалось забронировать: ${(<BookResponce>place)?.message}`, type: 'error' },
        { name: null, handler: null }
      );
    }
  } else {
    console.warn('Fail', error);
    renderToast(
      { text: 'Произошла ошибка', type: 'error' },
      { name: null, handler: null }
    );
  }
}

export function book(place: Place): void {
  const url = `/api/places/${place.id}` +
    `?checkInDate=${dateToUnixStamp(user?.searchData.checkin)}&` +
    `checkOutDate=${dateToUnixStamp(user?.searchData.checkout)}`;

  patch(url)
    .then((place) => {
      bookCallback(null, place);
    })
    .catch((error) => {
      bookCallback(error)
    })
}

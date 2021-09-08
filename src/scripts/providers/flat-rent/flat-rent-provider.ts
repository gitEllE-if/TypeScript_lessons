import { Place } from '../../domain/place';
import { Provider } from '../../domain/provider';
import { flatRentSdk } from '../../flat-rent-sdk';
import { BookParameters, SearchParameters } from '../../flat-rent-sdk/flat-rent-sdk';
import { calculateDistance } from '../../utils/calculate-distance';
import { calculateDifferenceInDays } from '../../utils/date-helper';
import { strToNumArr2 } from '../../utils/string-helper';
import { Place as FlatRentPlace } from './response'
import { BookFilterFlat, GetFilterFlat, SearchFilterFlat } from './search-filter';

export class FlatRentProvider implements Provider {
  public static provider = 'flat-rent';
  private static sdk = flatRentSdk;

  public find(filter: SearchFilterFlat): Promise<Place[]> {
    return FlatRentProvider.sdk.search(this.convertFilterToSearchParams(filter))
      .then((response) => {
        const daysCnt = calculateDifferenceInDays(filter.checkin, filter.checkout);
        return this.convertPlaceListResponse(<FlatRentPlace[]>response, strToNumArr2(filter.coordinates), daysCnt);
      })
  }

  public get(filter: GetFilterFlat): Promise<Place> {
    return FlatRentProvider.sdk.get(filter.id)
      .then((response) => {
        const daysCnt = calculateDifferenceInDays(filter.checkin, filter.checkout);
        return this.convertPlaceResponse(<FlatRentPlace>response, strToNumArr2(filter.coordinates), daysCnt);
      })
  }

  public book(filter: BookFilterFlat): Promise<Place> {
    return FlatRentProvider.sdk.book(...this.convertFilterToBookParams(filter))
      .then(() => {
        return this.get(filter)
      })
  }

  private convertFilterToSearchParams(filter: SearchFilterFlat): SearchParameters {
    const { city, checkin, checkout, price } = filter;
    return {
      city: city ? city : '',
      checkInDate: checkin,
      checkOutDate: checkout,
      priceLimit: price
    };
  }

  private convertFilterToBookParams(filter: BookFilterFlat): BookParameters {
    const { id, checkin, checkout } = filter;
    return [
      id,
      new Date(checkin),
      new Date(checkout)
    ];
  }

  private convertPlaceListResponse(items: FlatRentPlace[], coordinates: [number, number] | null, daysCnt: number): Place[] {
    return items.map((item) => {
      return this.convertPlaceResponse(item, coordinates, daysCnt)
    })
  }

  private convertPlaceResponse(item: FlatRentPlace, coordinates: [number, number] | null, daysCnt: number): Place {
    const remoteness: number | null = coordinates ? calculateDistance(coordinates, item.coordinates, 1) : Infinity;
    const price: number = item.totalPrice ? item.totalPrice / daysCnt : item.price || 0;
    return new Place(
      FlatRentProvider.provider,
      item.id,
      item.title,
      item.photos[0] || '',
      item.details,
      remoteness !== null ? remoteness : Infinity,
      item.bookedDates,
      price
    )
  }
}

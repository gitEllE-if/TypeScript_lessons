import { Place } from '../../domain/place';
import { Provider } from '../../domain/provider';
import { flatRentSdk } from '../../flat-rent-sdk';
import { BookParameters, SearchParameters } from '../../flat-rent-sdk/flat-rent-sdk';
import { calculateDistance } from '../../utils/calculate-distance';
import { strToNumArr2 } from '../../utils/string-helper';
import { Place as FlatRentPlace } from './response'
import { BookFilter_flat, GetFilter_flat, SearchFilter_flat } from './search-filter';

export class FlatRentProvider implements Provider {
  public static provider = 'flat-rent';
  private static sdk = flatRentSdk;

  public find(filter: SearchFilter_flat): Promise<Place[]> {
    return FlatRentProvider.sdk.search(this.convertFilterToSearchParams(filter))
      .then((response) => {
        return this.convertPlaceListResponse(<FlatRentPlace[]>response, strToNumArr2(filter.coordinates));
      })
  }

  public get(filter: GetFilter_flat): Promise<Place> {
    return FlatRentProvider.sdk.get(filter.id)
      .then((response) => {
        return this.convertPlaceResponse(<FlatRentPlace>response, strToNumArr2(filter.coordinates));
      })
  }

  public book(filter: BookFilter_flat): Promise<Place> {
    return FlatRentProvider.sdk.book(...this.convertFilterToBookParams(filter))
      .then(() => {
        return this.get(filter)
      })
  }

  private convertFilterToSearchParams(filter: SearchFilter_flat): SearchParameters {
    const { city, checkin, checkout, price } = filter;
    return {
      city: city ? city : '',
      checkInDate: checkin,
      checkOutDate: checkout,
      priceLimit: price
    };
  }

  private convertFilterToBookParams(filter: BookFilter_flat): BookParameters {
    const { id, checkin, checkout } = filter;
    return [
      id,
      new Date(checkin),
      new Date(checkout)
    ];
  }

  private convertPlaceListResponse(items: FlatRentPlace[], coordinates: [number, number] | null): Place[] {
    return items.map((item) => {
      return this.convertPlaceResponse(item, coordinates)
    })
  }

  private convertPlaceResponse(item: FlatRentPlace, coordinates: [number, number] | null): Place {
    const remoteness: number | null = coordinates ? calculateDistance(coordinates, item.coordinates, 1) : Infinity;
    return new Place(
      FlatRentProvider.provider,
      item.id,
      item.title,
      item.photos[0] || '',
      item.details,
      remoteness !== null ? remoteness : Infinity,
      item.bookedDates,
      item.price || item.totalPrice || 0
    )
  }
}

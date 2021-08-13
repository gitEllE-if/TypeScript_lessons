import { Place } from '../../domain/place';
import { Provider } from '../../domain/provider';
import { SearchFilter, BookFilter, GetFilter } from '../../domain/search-filter';
import { flatRentSdk } from '../../flat-rent-sdk';
import { BookParameters, SearchParameters } from '../../flat-rent-sdk/flat-rent-sdk';
import { calculateDistance } from '../../utils/calculate-distance';
import { strToNumArr2 } from '../../utils/string-helper';
import { Place as FlatRentPlace } from './response'

export class FlatRentProvider implements Provider {
  public static provider = 'flat-rent';
  private static sdk = flatRentSdk;

  public find(filter: SearchFilter): Promise<Place[]> {
    return FlatRentProvider.sdk.search(this.convertFilterToSearchParams(filter))
      .then((response) => {
        return this.convertPlaceListResponse(<FlatRentPlace[]>response, strToNumArr2(filter.coordinates));
      })
  }

  public get(filter: GetFilter): Promise<Place> {
    return FlatRentProvider.sdk.get(filter.id)
      .then((response) => {
        return this.convertPlaceResponse(<FlatRentPlace>response, strToNumArr2(filter.coordinates));
      })
  }

  public book(filter: BookFilter): Promise<Place> {
    return FlatRentProvider.sdk.book(...this.convertFilterToBookParams(filter))
      .then(() => {
        return this.get(filter)
      })
  }

  private convertFilterToSearchParams(filter: SearchFilter): SearchParameters {
    const { city, checkin, checkout, price } = filter;
    return {
      city: city,
      checkInDate: checkin,
      checkOutDate: checkout,
      priceLimit: price
    };
  }

  private convertFilterToBookParams(filter: SearchFilter): BookParameters {
    const { id, checkin, checkout } = filter;
    return [
      id,
      new Date(checkin),
      new Date(checkout)
    ];
  }

  private convertPlaceListResponse(items: FlatRentPlace[], coordinates: [number, number]): Place[] {
    return items.map((item) => {
      return this.convertPlaceResponse(item, coordinates)
    })
  }

  private convertPlaceResponse(item: FlatRentPlace, coordinates: [number, number]): Place {
    return new Place(
      FlatRentProvider.provider,
      item.id,
      item.title,
      item.photos[0],
      item.details,
      calculateDistance(coordinates, item.coordinates, 1),
      item.bookedDates,
      item.price ? item.price : item.totalPrice
    )
  }
}

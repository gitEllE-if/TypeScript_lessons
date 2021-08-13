import { Place } from '../../domain/place';
import { Provider } from '../../domain/provider';
import { SearchFilter, BookFilter, GetFilter } from '../../domain/search-filter';
import { dateToUnixStamp } from '../../utils/date-helper';
import { HttpHelper } from '../../utils/http-helper';
import { PlaceResponse, PlaceListResponse, Place as HomyPlace, PlaceErrorResponse } from './response'

export class HomyProvider implements Provider {
  public static provider = 'homy'
  private static apiUrl = '/api';

  public find(filter: SearchFilter): Promise<Place[]> {
    return HttpHelper.fetchAsJson<PlaceListResponse>(
      HomyProvider.apiUrl + '/places?' +
      this.convertFilterToQueryStr(filter, 'find')
    )
      .then((response) => {
        if ((<PlaceErrorResponse>response).code) {
          throw new Error((<PlaceErrorResponse>response).message)
        }
        return this.convertPlaceListResponse(<HomyPlace[]>response);
      })
  }

  public get(filter: GetFilter): Promise<Place> {
    return HttpHelper.fetchAsJson<PlaceResponse>(
      HomyProvider.apiUrl + '/places/' +
      this.convertFilterToQueryStr(<SearchFilter>filter, 'get')
    )
      .then((response) => {
        if ((<PlaceErrorResponse>response).code) {
          throw new Error((<PlaceErrorResponse>response).message)
        }
        return this.convertPlaceResponse(<HomyPlace>response);
      })
  }

  public book(filter: BookFilter): Promise<Place> {
    return HttpHelper.fetchAsJson<PlaceResponse>(
      HomyProvider.apiUrl + '/places/' +
      this.convertFilterToQueryStr(filter, 'book')
    )
      .then((response) => {
        if ((<PlaceErrorResponse>response).code) {
          throw new Error((<PlaceErrorResponse>response).message)
        }
        return this.convertPlaceResponse(<HomyPlace>response);
      })
  }

  private convertFilterToQueryStr(filter: SearchFilter, action: string): string {
    let url = '';
    switch (action) {
      case 'find':
        url = `&checkInDate=${dateToUnixStamp(filter.checkin)}&` +
          `checkOutDate=${dateToUnixStamp(filter.checkout)}&` +
          `coordinates=${filter.coordinates}`;
        url += filter.price === null ? '' : `&maxPrice=${filter.price}`;
        break;
      case 'book':
        url = `${filter.id}?checkInDate=${dateToUnixStamp(filter.checkin)}&` +
          `checkOutDate=${dateToUnixStamp(filter.checkout)}`;
        break;
      case 'get':
        url = `${filter.id}?coordinates=${filter.coordinates}`;
    }
    return url;
  }

  private convertPlaceListResponse(items: HomyPlace[]): Place[] {
    return items.map((item) => {
      return this.convertPlaceResponse(item)
    })
  }

  private convertPlaceResponse(item: HomyPlace): Place {
    return new Place(
      HomyProvider.provider,
      String(item.id),
      item.name,
      item.image,
      item.description,
      item.remoteness,
      item.bookedDates,
      item.price
    )
  }
}

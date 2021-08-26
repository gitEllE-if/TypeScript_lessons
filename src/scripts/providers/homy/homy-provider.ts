import { Place } from '../../domain/place';
import { Provider } from '../../domain/provider';
import { SearchFilter } from '../../domain/search-filter';
import { dateToUnixStamp } from '../../utils/date-helper';
import { HttpHelper } from '../../utils/http-helper';
import { PlaceResponse, PlaceListResponse, Place as HomyPlace, PlaceErrorResponse } from './response'
import { BookFilter_homy, GetFilter_homy, SearchFilter_homy } from './search-filter';

export class HomyProvider implements Provider {
  public static provider = 'homy'
  private static apiUrl = '/api';

  public find(filter: SearchFilter_homy): Promise<Place[]> {
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

  public get(filter: GetFilter_homy): Promise<Place> {
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

  public book(filter: BookFilter_homy): Promise<Place> {
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

  private convertFilterToQueryStr(filter: SearchFilter_homy | BookFilter_homy | GetFilter_homy, action: string): string {
    let url = '';
    switch (action) {
      case 'find':
        url = `&checkInDate=${dateToUnixStamp((<SearchFilter_homy>filter).checkin)}&` +
          `checkOutDate=${dateToUnixStamp((<SearchFilter_homy>filter).checkout)}&` +
          `coordinates=${(<SearchFilter_homy>filter).coordinates}`;
        url += (<SearchFilter_homy>filter).price === null ? '' : `&maxPrice=${(<SearchFilter_homy>filter).price}`;
        break;
      case 'book':
        url = `${(<BookFilter_homy>filter).id}` +
          `?checkInDate=${dateToUnixStamp((<BookFilter_homy>filter).checkin)}&` +
          `checkOutDate=${dateToUnixStamp((<BookFilter_homy>filter).checkout)}`;
        break;
      case 'get':
        url = `${(<GetFilter_homy>filter).id}?coordinates=${(<GetFilter_homy>filter).coordinates}`;
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

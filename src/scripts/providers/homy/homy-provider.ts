import { Place } from '../../domain/place';
import { Provider } from '../../domain/provider';
import { SearchFilter } from '../../domain/search-filter';
import { dateToUnixStamp } from '../../utils/date-helper';
import { HttpHelper } from '../../utils/http-helper';
import { PlaceResponse, PlaceListResponse, Place as HomyPlace, PlaceErrorResponse } from './response'
import { BookFilterHomy, GetFilterHomy, SearchFilterHomy } from './search-filter';

export class HomyProvider implements Provider {
  public static provider = 'homy'
  private static apiUrl = '/api';

  public find(filter: SearchFilterHomy): Promise<Place[]> {
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

  public get(filter: GetFilterHomy): Promise<Place> {
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

  public book(filter: BookFilterHomy): Promise<Place> {
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

  private convertFilterToQueryStr(filter: SearchFilterHomy | BookFilterHomy | GetFilterHomy, action: string): string {
    let url = '';
    switch (action) {
      case 'find':
        url = `&checkInDate=${dateToUnixStamp((<SearchFilterHomy>filter).checkin)}&` +
          `checkOutDate=${dateToUnixStamp((<SearchFilterHomy>filter).checkout)}&` +
          `coordinates=${(<SearchFilterHomy>filter).coordinates}`;
        url += (<SearchFilterHomy>filter).price === null ? '' : `&maxPrice=${(<SearchFilterHomy>filter).price}`;
        break;
      case 'book':
        url = `${(<BookFilterHomy>filter).id}` +
          `?checkInDate=${dateToUnixStamp((<BookFilterHomy>filter).checkin)}&` +
          `checkOutDate=${dateToUnixStamp((<BookFilterHomy>filter).checkout)}`;
        break;
      case 'get':
        url = `${(<GetFilterHomy>filter).id}?coordinates=${(<GetFilterHomy>filter).coordinates}`;
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

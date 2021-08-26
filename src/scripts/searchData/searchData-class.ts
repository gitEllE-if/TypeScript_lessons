import { ProviderName } from '../providers';
import { SearchFormData } from './SearchFormData';

export class SearchData implements SearchFormData {
  public id?: string;
  public readonly city: string;
  public readonly coordinates: string;
  public readonly price: number;
  public readonly checkin: Date;
  public readonly checkout: Date;
  public readonly provider: ProviderName[];

  constructor(searchFormDataRaw: FormData) {
    const { city, coordinates, price, checkin, checkout, provider } = this.getSearchFormData(searchFormDataRaw);
    this.city = city;
    this.coordinates = coordinates;
    this.price = price;
    this.checkin = checkin;
    this.checkout = checkout;
    this.provider = provider;
  }

  private getSearchFormData(formData: FormData): SearchFormData {
    const searchFormData: SearchFormData = {
      city: '',
      coordinates: '',
      price: 0,
      checkin: new Date(),
      checkout: new Date(),
      provider: []
    };
    if (!formData) {
      return searchFormData;
    }
    try {
      for (const key in searchFormData) {
        if (formData.has(key)) {
          switch (typeof (searchFormData[key])) {
            case 'string':
              searchFormData[key] = formData.get(key);
              break;
            case 'number': {
              const nbr = Number(formData.get(key));
              searchFormData[key] = (formData.get(key) && isFinite(nbr) && !isNaN(nbr)) ? nbr : null;
              break;
            }
            case 'object':
              if (searchFormData[key] instanceof Date) {
                searchFormData[key] = new Date(String(formData.get(key)));
              }
              else if (Array.isArray(searchFormData[key])) {
                searchFormData[key] = formData.getAll(key);
              }
          }
        }
      }
      return searchFormData;
    }
    catch (error) {
      console.warn('FAIL ==> an error occured while fetching SearchData ' + error);
      return searchFormData;
    }
  }
}

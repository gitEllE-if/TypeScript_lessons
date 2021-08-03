import { SearchFormData } from './SearchFormData';

export class SearchData implements SearchFormData {
  city: string;
  coordinates: string;
  price: number;
  checkin: Date;
  checkout: Date;

  constructor(searchFormDataRaw: FormData) {
    const { city, coordinates, price, checkin, checkout } = this.getSearchFormData(searchFormDataRaw);
    this.city = city;
    this.coordinates = coordinates;
    this.price = price;
    this.checkin = checkin;
    this.checkout = checkout;
  }

  getSearchFormData(formData: FormData): SearchFormData {
    const searchFormData: SearchFormData = {
      city: '',
      coordinates: '',
      price: 0,
      checkin: null,
      checkout: null
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
              searchFormData[key] = new Date(String(formData.get(key)));
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

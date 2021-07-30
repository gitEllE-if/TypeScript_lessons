interface SearchFormData {
  city: string;
  coordinates: string;
  price: number;
  checkin: Date;
  checkout: Date;
}

export class SearchData {
  searchFormData: SearchFormData;

  constructor(searchFormDataRaw: FormData) {
    this.searchFormData = this.getSearchFormData(searchFormDataRaw);
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

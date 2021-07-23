interface SearchFormData {
  city: string;
  coordinates: string;    // TODO {x: number, y: number}
  price: number;
  checkin: Date;
  checkout: Date;
}

export class SearchData {
  searchFormData: SearchFormData;

  constructor(searchFormDataRaw: unknown) {
    this.searchFormData = this.getSearchFormData(searchFormDataRaw);
  }

  getSearchFormData(data: unknown): SearchFormData {
    const searchFormData: SearchFormData = {
      city: '',
      coordinates: '',
      price: 0,
      checkin: new Date(),
      checkout: new Date()
    };
    let searchDataObj: any = {};

    try {
      switch (typeof (data)) {
        case 'undefined':
          return searchFormData;
        case 'string':
          searchDataObj = JSON.parse(data);
          break;
        case 'object':
          if (data === null || Array.isArray(data) || data instanceof Date) {
            break;
          }
          searchDataObj = data;
      }
      for (const key in searchDataObj) {
        if (key in searchFormData) {
          switch (typeof (searchFormData[key])) {
            case 'undefined':
              break;
            case 'string':
              searchFormData[key] = searchDataObj[key];
              break;
            case 'number':
              searchFormData[key] = (isFinite(searchDataObj[key]) && !isNaN(searchDataObj[key])) ?
                Number(searchDataObj[key]) : 0;
              break;
            case 'object':
              searchFormData[key] = searchFormData[key] instanceof Date ? new Date(searchDataObj[key]) : null;
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

import { SearchData } from './search-class.js';

export function search(event: Event): void {
  const formEl = <HTMLFormElement>event.target;
  const formData = new FormData(formEl);
  event.preventDefault();

  for (const elem of formEl.elements) {
    if ((<HTMLFormElement>elem).disabled == true) {
      formData.set((<HTMLFormElement>elem).name, (<HTMLFormElement>elem).value);
    }
  }
  const searchData = new SearchData(formData);
  const callback: SearchCallback = (error, plase) => {
    setTimeout(() => {
      if (error == null && plase != null) {
        console.log('Success!', plase)
      } else {
        console.warn('Fail', error)
      }
    }, 2000);
  }
  printSearchResult(searchData, callback);
}

interface Place {
  data: unknown;     // TEMP to suppress the lint error 'empty interface'
}

interface SearchCallback {
  (error?: Error, place?: Place[]): void
}

function searchRequest() {
  const place: Place[] = [{ data: '' }];
  return (Math.random() < 0.5) ?
    Promise.resolve(place) : Promise.reject(Error)
}

function printSearchResult(data: SearchData, callback) {
  console.log(data);
  searchRequest()
    .then((plase) => {
      callback(null, plase)
    })
    .catch((error) => {
      callback(error)
    })
}

import { renderBlock, insertBlock } from './lib';
import { Place } from './Place';
import { placeStorage } from './storage';
import { book } from './book';
import { toggleFavorite } from './toggle-favorite';
import { Flat } from './flat-rent-sdk/flat-rent-sdk';

export function renderSearchStubBlock(): void {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock(reasonMessage: string): void {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

export function renderSearchResultsBlock(): void {
  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list" id="search-result-list">
    </ul>
    `
  );
}

export function renderSearchResultsItem(place: Place, placeInFavorite: boolean): void {
  insertBlock(
    'search-result-list',
    `
    <li class="result">
      <div class="result-container">
        <div class="result-img-container">
          <div class="favorites ${placeInFavorite ? ' active' : ''}" id="favorite${place.id}"></div>
          <img class="result-img" src=${place.image} alt="">
        </div>	
        <div class="result-info">
          <div class="result-info--header">
            <p>${place.name}</p>
            <p class="price">${place.price}&#8381;</p>
          </div>
          <div class="${place.remoteness ? 'result-info--map' : 'invisible'}">
            <i class="map-icon"></i> ${place.remoteness}км от вас
          </div>
          <div class="result-info--descr">${place.description}</div>
          <div class="result-info--footer">
            <div>
              <button id="book-btn${place.id}">Забронировать</button>
            </div>
          </div>
        </div>
      </div>
    </li>
    `
  );
}

export function putSearchResultsItems(places: Place[] | Flat[]): void {
  for (let place of places) {
    {
      if ((<Flat>place).title) {
        if ((<Flat>place).totalPrice) {
          (<Flat>place).price = (<Flat>place).totalPrice;
        }
        place = <Place>{
          ...place,
          image: (<Flat>place).photos[0],
          name: (<Flat>place).title,
          description: (<Flat>place).details,
          remoteness: null
        }
      }
    }
    renderSearchResultsItem(<Place>place, placeStorage.hasItem(<Place>place))
    document.getElementById(`favorite${place.id}`).addEventListener('click', toggleFavorite.bind(null, place));
    document.getElementById(`book-btn${place.id}`).addEventListener('click', book.bind(null, place));
  }
}

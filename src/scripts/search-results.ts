import { renderBlock, insertBlock } from './lib';
import { Place } from './domain/place';
import { placeStorage } from './storage';
import { book } from './book';
import { toggleFavorite } from './toggle-favorite';

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
            <select id="search-results-sorting">
                <option value="ascendingPrice" selected="selected">Сначала дешёвые</option>
                <option value="descendingPrice">Сначала дорогие</option>
                <option value="ascendingRemoteness">Сначала ближе</option>
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
            <i class="map-icon"></i> ${place.remoteness} км от вас
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

export function clearSearchResultsItems(): void {
  renderBlock('search-result-list', '');
}

export function putSearchResultsItems(places: Place[]): void {
  for (const place of places) {
    renderSearchResultsItem(place, placeStorage.hasItem(place))
    document.getElementById(`favorite${place.id}`).addEventListener('click', toggleFavorite.bind(null, place));
    document.getElementById(`book-btn${place.id}`).addEventListener('click', book.bind(null, place));
  }
}

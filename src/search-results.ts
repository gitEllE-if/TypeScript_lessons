import { renderBlock, insertBlock } from './lib';
import { Place } from './Place';
import { PlaceStorage } from './storage/storage-class';

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

export function renderSearchResultsBlock(places: Place[],
  placeStorage: PlaceStorage,
  toggleFavorite: (place: Place, stor: PlaceStorage) => void): void {
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
  for (const place of places) {
    insertBlock(
      'search-result-list',
      `
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites ${placeStorage.hasItem(place) ? ' active' : ''}" id=${place.id}></div>
            <img class="result-img" src=${place.image} alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${place.name}</p>
              <p class="price">${place.price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> ${place.remoteness}км от вас</div>
            <div class="result-info--descr">${place.description}</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
      `
    );
    document.getElementById(`${place.id}`).addEventListener('click', toggleFavorite.bind(null, place, placeStorage));
  }
}

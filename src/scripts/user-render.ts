import { renderBlock } from './lib';

export function renderUserBlock(userName: string, avatarUrl: string,
  favoriteItemsAmount: number): void {
  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${avatarUrl} alt=${userName} />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav" id="user-favorite">
          </p>
      </div>
    </div>
    `
  );
  renderUserFavoriteBlock(favoriteItemsAmount);
}

export function renderUserFavoriteBlock(favoriteItemsAmount: number): void {
  favoriteItemsAmount = favoriteItemsAmount > 0 ? Math.trunc(favoriteItemsAmount) : 0;
  const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет';
  const hasFavoriteItems = favoriteItemsAmount ? true : false;

  renderBlock(
    'user-favorite',
    `
    <i class="heart-icon${hasFavoriteItems ? ' active' : ''}"></i>${favoritesCaption}
    `
  );
}

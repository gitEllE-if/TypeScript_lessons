import { renderSearchFormBlock } from './search-form';
import { renderSearchStubBlock } from './search-results';
import { renderUserBlock } from './user-render';
import { user } from './user'

import './styles/index.css';
import './styles/reset.css';

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock(user.userData.userName, user.userData.avatarUrl, user.favoritesAmount);
  renderSearchFormBlock(undefined, undefined);
  renderSearchStubBlock();
});

import { putSearchForm } from './scripts/search-form';
import { renderSearchStubBlock } from './scripts/search-results';
import { renderUserBlock } from './scripts/user-render';
import { user } from './scripts/user'

import './styles/index.css';
import './styles/reset.css';

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock(user.userName, user.avatarUrl, user.favoritesAmount);
  putSearchForm(undefined, undefined);
  renderSearchStubBlock();
});

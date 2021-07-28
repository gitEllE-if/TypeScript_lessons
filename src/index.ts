import { renderSearchFormBlock } from './search-form';
import { renderSearchStubBlock } from './search-results';
import { renderUserBlock } from './user';
import { renderToast } from './lib';
import { User } from './user-class';
import { search } from './search';

import './styles/index.css';
import './styles/reset.css';

window.addEventListener('DOMContentLoaded', () => {
  // localStorage.setItem('favoritesAmount', '2');
  // localStorage.setItem('user', JSON.stringify({ userName: 'EllE', avatarUrl: '/img/avatar.png' }));

  const user = new User(localStorage.getItem('user'), localStorage.getItem('favoritesAmount'));
  renderUserBlock(user.userData.userName, user.userData.avatarUrl, user.favoritesAmount);
  renderSearchFormBlock(undefined, undefined);
  document.forms['search-form'].addEventListener('submit', (event: Event) => { search(event) });
  renderSearchStubBlock();
  renderToast(
    { text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' },
    { name: 'Понял(а)', handler: () => { console.log('Уведомление закрыто') } }
  );
});

import { renderSearchFormBlock } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
import { renderToast } from './lib.js';
import { User } from './user-class.js';

window.addEventListener('DOMContentLoaded', () => {

  localStorage.setItem('favoritesAmount', '2');
  localStorage.setItem('user', JSON.stringify({ userName: 'EllE', avatarUrl: '/img/avatar.png' }));

  const user = new User(localStorage.getItem('user'), localStorage.getItem('favoritesAmount'));
  renderUserBlock(user.userData.userName, user.userData.avatarUrl, user.favoritesAmount);
  renderSearchFormBlock(undefined, undefined);
  renderSearchStubBlock();
  renderToast(
    { text: 'Это пример уведомления. Используйте его при необходимости', type: 'success' },
    { name: 'Понял(а)', handler: () => { console.log('Уведомление закрыто') } }
  );
});

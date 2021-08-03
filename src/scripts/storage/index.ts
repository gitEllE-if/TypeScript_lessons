import { UserStorage, PlaceStorage } from './storage-class';

export const placeStorage = new PlaceStorage('favoriteItems');
export const userStorage = new UserStorage('user');
userStorage.set({ userName: 'EllE', avatarUrl: '/img/avatar.png' })

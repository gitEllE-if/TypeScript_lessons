import { StorageHandler, PlaceStorage } from './storage-class';
import { UserData } from '../user/user-class';

export const placeStorage = new PlaceStorage('favoriteItems');
export const userStorage = new StorageHandler<UserData>('user');
userStorage.set({ userName: 'EllE', avatarUrl: '/img/avatar.png' })

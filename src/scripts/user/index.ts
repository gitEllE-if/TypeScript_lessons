import { User } from './user-class';
import { userStorage, placeStorage } from '../storage';

export const user = new User(userStorage.get(), placeStorage.itemAmount());

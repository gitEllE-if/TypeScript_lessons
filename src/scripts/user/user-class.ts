import { SearchData } from '../searchData/searchData-class';
import { UserData } from './UserData';

export class User implements UserData {
  public readonly userName: string;
  public readonly avatarUrl: string;
  public favoritesAmount: number;
  public searchData?: SearchData;

  constructor(userDataRaw: unknown, favoritesAmountRaw: unknown) {
    const { userName, avatarUrl } = this.getUserData(userDataRaw);
    this.userName = userName;
    this.avatarUrl = avatarUrl;
    this.favoritesAmount = this.getFavoritesAmount(favoritesAmountRaw);
  }

  private getUserData(data: unknown): UserData {
    const userData: UserData = { userName: 'unknown', avatarUrl: '/img/default.svg' };
    let dataObj: Partial<Record<'userName' | 'avatarUrl', string>> = {};
    try {
      switch (typeof (data)) {
        case 'undefined':
          return userData;
        case 'string':
          dataObj = JSON.parse(data);
          break;
        case 'object':
          if (data === null || Array.isArray(data) || data instanceof Date) {
            break;
          }
          dataObj = data;
      }
      for (const key in dataObj) {
        if (key in userData) {
          userData[key as keyof typeof userData] = dataObj[key as keyof typeof dataObj] || '';
        }
      }
      return userData;
    }
    catch (error) {
      console.warn('FAIL ==> an error occured while fetching UserData ' + error);
      return userData;
    }
  }

  private getFavoritesAmount(data: unknown): number {
    const nbr = Number(data);
    return !isNaN(nbr) && isFinite(nbr) && nbr > 0 ? Math.trunc(nbr) : 0;
  }
}

interface UserData {
  userName: string;
  avatarUrl: string;
}

export class User {
  userData: UserData;
  favoritesAmount: number;

  constructor(userDataRaw: unknown, favoritesAmountRaw: unknown) {
    this.userData = this.getUserData(userDataRaw);
    this.favoritesAmount = this.getFavoritesAmount(favoritesAmountRaw);
  }

  getUserData(data: unknown): UserData {
    const userData: UserData = { userName: 'unknown', avatarUrl: '/img/default.svg' };
    let dataObj: any = {};
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
          userData[key] = dataObj[key];
        }
      }
      return userData;
    }
    catch (error) {
      console.warn('FAIL ==> an error occured while fetching UserData ' + error);
      return userData;
    }
  }

  getFavoritesAmount(data: unknown): number {
    const nbr = Number(data);
    return !isNaN(nbr) && isFinite(nbr) && nbr > 0 ? Math.trunc(nbr) : 0;
  }
}

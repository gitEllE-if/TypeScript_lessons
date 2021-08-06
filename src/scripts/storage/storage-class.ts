import { PartPlace } from '../types';
import { UserData } from '../user/UserData';

export class StorageHandler<V>{
  key: string;
  constructor(key: string) {
    this.key = key;
  }
  set(value: V): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }
  get(): V {
    const valueStr: string = localStorage.getItem(this.key);
    if (!valueStr) {
      return null;
    }
    try {
      return <V>JSON.parse(valueStr);
    }
    catch (error) {
      console.warn('FAIL ==> an error occured while get from storage ' + error);
      return null;
    }
  }
}

export class IterableStorage<V extends Iterable<unknown>> extends StorageHandler<Iterable<unknown>> {
  set(value: V): void {
    super.set(Array.from(value));
  }
}

export class MapStorage<V extends Map<number | string, unknown>> extends IterableStorage<V>{
  get(): V {
    const value = <V>super.get();
    return value ? <V>new Map(value) : null;
  }
}

export class PlaceMapStorage<V extends Map<number | string, PartPlace>> extends MapStorage<V>{
  toggleItem(place: PartPlace): void {
    let placeMap: V = this.get();
    if (!placeMap || !placeMap.size) {
      placeMap = <V>new Map([[place.id, place]]);
    }
    else {
      placeMap.has(place.id) ? placeMap.delete(place.id) : placeMap.set(place.id, place);
    }
    this.set(<V>placeMap);
  }
  hasItem(place: PartPlace): boolean {
    const placeMap: V = this.get();
    return placeMap && placeMap.size && placeMap.has(place.id);
  }
  itemAmount(): number {
    const placeMap: V = this.get();
    return placeMap ? placeMap.size : 0;
  }
}

export class UserStorage extends StorageHandler<UserData>{ }
export class PlaceStorage extends PlaceMapStorage<Map<number, PartPlace>>{ }

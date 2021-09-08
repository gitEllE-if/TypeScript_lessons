import { PartPlace } from '../domain/place';
import { UserData } from '../user/UserData';

export class StorageHandler<V>{
  constructor(
    private readonly key: string
  ) { }
  public getKey(): string {
    return this.key;
  }
  public set(value: V): void {
    localStorage.setItem(this.key, JSON.stringify(value));
  }

  public get(): V | null {
    const valueStr = localStorage.getItem(this.key);
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
  public set(value: V): void {
    super.set(Array.from(value));
  }
}

export class MapStorage<V extends Map<number | string, unknown>> extends IterableStorage<V>{
  public get(): V | null {
    const value = <V>super.get();
    return value ? <V>new Map(value) : null;
  }
}

export class PlaceMapStorage<V extends Map<string, PartPlace>> extends MapStorage<V>{
  public toggleItem(place: PartPlace): void {
    let placeMap = this.get();
    if (!placeMap || !placeMap.size) {
      placeMap = <V>new Map([[place.id, place]]);
    }
    else {
      placeMap.has(place.id) ? placeMap.delete(place.id) : placeMap.set(place.id, place);
    }
    this.set(<V>placeMap);
  }
  public hasItem(place: PartPlace): boolean {
    const placeMap = this.get();
    return (placeMap !== null) && (placeMap.size > 0) && placeMap.has(place.id);
  }
  public itemAmount(): number {
    const placeMap = this.get();
    return placeMap ? placeMap.size : 0;
  }
}

export class UserStorage extends StorageHandler<UserData>{ }
export class PlaceStorage extends PlaceMapStorage<Map<string, PartPlace>>{ }

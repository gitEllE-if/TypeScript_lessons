import { book } from '../book';
import { toggleFavorite } from '../toggle-favorite';

export class Place {
  public readonly toggleFavEventHandler = toggleFavorite.bind(null, this);
  public readonly bookEventHandler = book.bind(null, this);
  constructor(
    private readonly provider: string,
    public readonly originalId: string,
    public readonly name: string,
    public readonly image: string,
    public readonly description: string,
    public readonly remoteness: number,
    public readonly bookedDates: number[],
    public readonly price: number
  ) { }

  get id(): string {
    return this.provider + '-' + this.originalId
  }

  getProvider(): string {
    return this.provider;
  }

  public isProvidedBy(providerName: string): boolean {
    return this.provider === providerName
  }
}

export type PartPlace = Pick<Place, 'id' | 'name' | 'image'>

import { Provider } from '../domain/provider';
import { flatRentProvider } from './flat-rent';
import { homyProvider } from './homy';

export type ProviderName = 'homy' | 'flat-rent';

export const PROVIDERS: { [name: string]: Provider } = {
  'homy': homyProvider,
  'flat-rent': flatRentProvider
}

import { Provider } from '../domain/provider';
import { flatRentProvider } from '../providers/flat-rent';
import { homyProvider } from '../providers/homy';

export type ProviderName = 'homy' | 'flat-rent';

export const PROVIDERS: { [name: string]: Provider } = {
  'homy': homyProvider,
  'flat-rent': flatRentProvider
}

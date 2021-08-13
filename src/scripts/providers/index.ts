import { flatRentProvider } from '../providers/flat-rent';
import { homyProvider } from '../providers/homy';

export type ProviderName = 'homy' | 'flat-rent';

export const PROVIDERS = {
  'homy': homyProvider,
  'flat-rent': flatRentProvider
}

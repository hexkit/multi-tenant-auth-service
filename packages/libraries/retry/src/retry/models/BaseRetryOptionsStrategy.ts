import { type RetryOptionsStrategyKind } from './RetryOptionsStrategyKind.js';

export interface BaseRetryOptionsStrategy<
  TKind extends RetryOptionsStrategyKind,
> {
  kind: TKind;
  maxAttempts?: number;
}

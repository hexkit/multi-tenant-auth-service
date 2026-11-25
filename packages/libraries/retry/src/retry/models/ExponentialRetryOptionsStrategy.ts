import { type BaseRetryOptionsStrategy } from './BaseRetryOptionsStrategy.js';
import { type RetryOptionsStrategyKind } from './RetryOptionsStrategyKind.js';

export interface ExponentialRetryOptionsStrategy extends BaseRetryOptionsStrategy<RetryOptionsStrategyKind.exponential> {
  initialDelayMs: number;
  maxDelayMs?: number;
  factor: number;
}

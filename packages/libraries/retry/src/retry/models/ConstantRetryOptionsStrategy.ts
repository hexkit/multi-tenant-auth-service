import { type BaseRetryOptionsStrategy } from './BaseRetryOptionsStrategy.js';
import { type RetryOptionsStrategyKind } from './RetryOptionsStrategyKind.js';

export interface ConstantRetryOptionsStrategy extends BaseRetryOptionsStrategy<RetryOptionsStrategyKind.constant> {
  delayMs: number;
}

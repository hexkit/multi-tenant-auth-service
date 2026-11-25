import { type ConstantRetryOptionsStrategy } from './ConstantRetryOptionsStrategy.js';
import { type ExponentialRetryOptionsStrategy } from './ExponentialRetryOptionsStrategy.js';

export type RetryOptionsStrategy =
  | ConstantRetryOptionsStrategy
  | ExponentialRetryOptionsStrategy;

import { type RetryOptionsStrategy } from './RetryOptionsStrategy.js';

export interface RetryOptions<T> {
  operation: () => T | Promise<T>;
  strategy: RetryOptionsStrategy;
}

import { inject, injectable } from 'inversify';

import { Environment } from '../domain/Environment.js';
import { EnvironmentLoader } from './EnvironmentLoader.js';

@injectable()
export class EnvironmentService {
  readonly #environmentLoader: EnvironmentLoader;

  constructor(
    @inject(EnvironmentLoader)
    environmentLoader: EnvironmentLoader,
  ) {
    this.#environmentLoader = environmentLoader;
  }

  public getEnvironment(): Environment {
    return this.#environmentLoader.env;
  }
}

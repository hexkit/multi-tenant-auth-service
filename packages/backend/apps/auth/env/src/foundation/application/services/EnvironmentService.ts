import { inject, injectable } from 'inversify';

import { EnvironmentLoader } from '../../adapter/dotenv/services/EnvironmentLoader.js';
import { type Environment } from '../models/Environment.js';

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

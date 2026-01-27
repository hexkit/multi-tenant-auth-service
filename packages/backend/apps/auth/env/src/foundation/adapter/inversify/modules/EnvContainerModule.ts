import { ContainerModule, type ContainerModuleLoadOptions } from 'inversify';

import { EnvironmentService } from '../../../application/services/EnvironmentService.js';
import { EnvironmentLoader } from '../../dotenv/services/EnvironmentLoader.js';

export class EnvContainerModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions): void => {
      options.bind(EnvironmentLoader).toSelf().inSingletonScope();
      options.bind(EnvironmentService).toSelf().inSingletonScope();
    });
  }
}

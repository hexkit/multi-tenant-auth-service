import { ContainerModule, type ContainerModuleLoadOptions } from 'inversify';

import { EnvironmentLoader } from '../../../application/EnvironmentLoader.js';
import { EnvironmentService } from '../../../application/EnvironmentService.js';

export class EnvContainerModule extends ContainerModule {
  constructor() {
    super((options: ContainerModuleLoadOptions): void => {
      options.bind(EnvironmentLoader).toSelf().inSingletonScope();
      options.bind(EnvironmentService).toSelf().inSingletonScope();
    });
  }
}

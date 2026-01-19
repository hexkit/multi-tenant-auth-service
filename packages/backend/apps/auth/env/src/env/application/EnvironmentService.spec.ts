import type { Mocked } from 'vitest';
import { beforeAll, describe, expect, it } from 'vitest';

import { Environment } from '../domain/Environment.js';
import { EnvironmentLoader } from './EnvironmentLoader.js';
import { EnvironmentService } from './EnvironmentService.js';

describe(EnvironmentService, () => {
  let environmentLoaderMock: Mocked<EnvironmentLoader>;
  let environmentService: EnvironmentService;

  beforeAll(() => {
    const environmentFixture: Environment = {
      apiKey: 'test-api-key',
      corsOrigins: ['http://localhost:3000'],
      databaseConnectionString: 'postgresql://user:pass@localhost:5432/db',
      host: '127.0.0.1',
      mail: {
        defaultAddress: 'test@example.com',
        host: 'localhost',
        password: 'password',
        port: 1025,
        user: 'user',
        useTls: false,
      },
      port: 3001,
      superAdminList: [{ email: 'admin@example.com', name: 'Admin' }],
    };

    environmentLoaderMock = {
      env: environmentFixture,
    } as Mocked<EnvironmentLoader>;

    environmentService = new EnvironmentService(environmentLoaderMock);
  });

  describe('.getEnvironment', () => {
    describe('when called', () => {
      let result: Environment;

      beforeAll(() => {
        result = environmentService.getEnvironment();
      });

      it('should return the environment from the loader', () => {
        expect(result).toBe(environmentLoaderMock.env);
      });
    });
  });
});

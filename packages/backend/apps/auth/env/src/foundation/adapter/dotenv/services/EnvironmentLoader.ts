import { DotEnvLoader } from '@hexkit/dotenv';
import { bool, cleanEnv, json, num, str, url } from 'envalid';
import { injectable } from 'inversify';

import { Environment } from '../../../application/models/Environment.js';
import { EnvironmentRaw } from '../../../application/models/EnvironmentRaw.js';

const DEFAULT_DOT_ENV_PATH: string = '.env';
const DOT_ENV_PATH_ENV_VAR: string = 'APP_DOT_ENV_PATH';
const DOT_ENV_ENABLED_ENV_VAR: string = 'APP_DOT_ENV_ENABLED';

@injectable()
export class EnvironmentLoader extends DotEnvLoader<Environment> {
  public static build(): EnvironmentLoader {
    const dotEnvPath: string =
      process.env[DOT_ENV_PATH_ENV_VAR] ?? DEFAULT_DOT_ENV_PATH;

    const environmentLoader: EnvironmentLoader = new EnvironmentLoader(
      dotEnvPath,
    );

    return environmentLoader;
  }

  protected _parseEnv(env: Record<string, string>): Environment {
    const rawEnv: EnvironmentRaw = cleanEnv(env, {
      AUTH_API_KEY: str(),
      AUTH_CORS_ORIGINS: json(),
      AUTH_DATABASE_CONNECTION_STRING: url(),
      AUTH_HOST: str(),
      AUTH_MAIL_DEFAULT_ADDRESS: str(),
      AUTH_MAIL_HOST: str(),
      AUTH_MAIL_PASSWORD: str({ default: '' }),
      AUTH_MAIL_PORT: num(),
      AUTH_MAIL_USE_TLS: bool(),
      AUTH_MAIL_USER: str({ default: '' }),
      AUTH_PORT: num(),
      AUTH_SUPER_ADMIN_LIST: json(),
    });

    return {
      apiKey: rawEnv.AUTH_API_KEY,
      corsOrigins: rawEnv.AUTH_CORS_ORIGINS,
      databaseConnectionString: rawEnv.AUTH_DATABASE_CONNECTION_STRING,
      host: rawEnv.AUTH_HOST,
      mail: {
        defaultAddress: rawEnv.AUTH_MAIL_DEFAULT_ADDRESS,
        host: rawEnv.AUTH_MAIL_HOST,
        password: rawEnv.AUTH_MAIL_PASSWORD,
        port: rawEnv.AUTH_MAIL_PORT,
        user: rawEnv.AUTH_MAIL_USER,
        useTls: rawEnv.AUTH_MAIL_USE_TLS,
      },
      port: rawEnv.AUTH_PORT,
      superAdminList: rawEnv.AUTH_SUPER_ADMIN_LIST,
    };
  }

  protected override _shouldParseEnvFile(): boolean {
    return process.env[DOT_ENV_ENABLED_ENV_VAR] !== 'false';
  }
}

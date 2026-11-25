import { type BetterAuthOptions, type Logger } from 'better-auth';
import { type DBAdapter } from 'better-auth/adapters';
import {
  type admin,
  type emailOTP,
  type openAPI,
  type organization,
  type twoFactor,
} from 'better-auth/plugins';

export interface AppBetterAuthOptions extends BetterAuthOptions {
  database: (options: BetterAuthOptions) => DBAdapter;
  emailAndPassword: {
    enabled: true;
  };
  logger: Logger;
  plugins: [
    ReturnType<typeof admin>,
    ReturnType<typeof emailOTP>,
    ReturnType<typeof organization>,
    ReturnType<typeof openAPI>,
    ReturnType<typeof twoFactor>,
  ];
  trustedOrigins: string[];
}

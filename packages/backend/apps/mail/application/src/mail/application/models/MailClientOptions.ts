import { type MailClientAuthOptions } from './MailClientAuthOptions.js';

export interface MailClientOptions {
  readonly auth: MailClientAuthOptions;
  readonly host: string;
  readonly port: number;
  readonly useTls: boolean;
}

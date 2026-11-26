import {
  type MailClientOptions,
  mailDeliveryOutputPortSymbol,
} from '@multi-tenant-auth-service/mail-application';
import { ContainerModule, type ContainerModuleLoadOptions } from 'inversify';
import {
  createTransport,
  type SentMessageInfo,
  type Transporter,
} from 'nodemailer';

import { MailDeliveryNodeMailerAdapter } from '../../nodemailer/adapters/MailDeliveryNodeMailerAdapter.js';
import { mailClientOptionsSymbol } from '../../nodemailer/models/mailClientOptionsSymbol.js';
import { transporterSymbol } from '../../nodemailer/models/transporterSymbol.js';
import { type MailModuleOptions } from '../models/MailModuleOptions.js';

export class MailModule extends ContainerModule {
  constructor(options: MailModuleOptions) {
    super((containerModuleOptions: ContainerModuleLoadOptions): void => {
      containerModuleOptions
        .bind(mailClientOptionsSymbol)
        .toResolvedValue(options.useFactory, options.inject ?? [])
        .inSingletonScope();

      containerModuleOptions
        .bind(mailDeliveryOutputPortSymbol)
        .to(MailDeliveryNodeMailerAdapter)
        .inSingletonScope();

      containerModuleOptions.bind(transporterSymbol).toResolvedValue(
        (options: MailClientOptions): Transporter<SentMessageInfo> =>
          createTransport({
            auth: {
              pass: options.auth.password,
              user: options.auth.user,
            },
            host: options.host,
            port: options.port,
            secure: options.useTls,
          }),
        [mailClientOptionsSymbol],
      );
    });
  }
}

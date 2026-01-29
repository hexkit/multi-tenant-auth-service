import { betterAuth } from 'better-auth';
import { ContainerModule, ContainerModuleLoadOptions } from 'inversify';

import { MailDeliveryOptionsFromSendOtpMailOptionsBuilder } from '../../../../mail/application/builders/MailDeliveryOptionsFromSendOtpMailOptionsBuilder.js';
import { MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder } from '../../../../mail/application/builders/MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder.js';
import { BetterAuthOptionsFromEnvBuilder } from '../../betterAuth/builders/BetterAuthOptionsFromEnvBuilder.js';
import { AppBetterAuthOptions } from '../../betterAuth/models/AppBetterAuthOptions.js';
import { BetterAuth } from '../../betterAuth/models/BetterAuth.js';
import { betterAuthServiceIdentifier } from '../models/betterAuthServiceIdentifier.js';

export class BetterAuthModule extends ContainerModule {
  constructor() {
    super((containerModuleLoadOptions: ContainerModuleLoadOptions) => {
      containerModuleLoadOptions
        .bind(MailDeliveryOptionsFromSendOtpMailOptionsBuilder)
        .toSelf()
        .inSingletonScope();

      containerModuleLoadOptions
        .bind(MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder)
        .toSelf()
        .inSingletonScope();

      containerModuleLoadOptions
        .bind(BetterAuthOptionsFromEnvBuilder)
        .toSelf()
        .inSingletonScope();

      containerModuleLoadOptions
        .bind(betterAuthServiceIdentifier)
        .toResolvedValue(
          (
            betterAuthOptionsFromEnvBuilder: BetterAuthOptionsFromEnvBuilder,
          ): BetterAuth<AppBetterAuthOptions> =>
            betterAuth(betterAuthOptionsFromEnvBuilder.build()),
          [BetterAuthOptionsFromEnvBuilder],
        );
    });
  }
}

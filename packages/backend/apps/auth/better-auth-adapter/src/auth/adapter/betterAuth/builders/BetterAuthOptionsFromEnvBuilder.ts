import { Builder } from '@hexkit/patterns';
import {
  FindManyUsersOutputPort,
  findManyUsersOutputPortSymbol,
} from '@multi-tenant-auth-service/auth-application';
import { User } from '@multi-tenant-auth-service/auth-domain';
import { PrismaClient } from '@multi-tenant-auth-service/auth-prisma-adapter';
import {
  MailDeliveryOutputPort,
  mailDeliveryOutputPortSymbol,
} from '@multi-tenant-auth-service/mail-application';
import { BetterAuthOptions, InferUser, PrettifyDeep } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import {
  admin,
  emailOTP,
  openAPI,
  organization,
  twoFactor,
} from 'better-auth/plugins';
import { inject, injectable } from 'inversify';

import { MailDeliveryOptionsFromSendOtpMailOptionsBuilder } from '../../../../mail/application/builders/MailDeliveryOptionsFromSendOtpMailOptionsBuilder.js';
import { AppBetterAuthOptions } from '../models/AppBetterAuthOptions.js';

const BETTER_AUTH_ADMIN_ROLE: string = 'admin';

@injectable()
export class BetterAuthOptionsFromEnvBuilder implements Builder<AppBetterAuthOptions> {
  readonly #findManyUsersOutputPort: FindManyUsersOutputPort;
  readonly #mailDeliveryOutputPort: MailDeliveryOutputPort;
  readonly #mailDeliveryOptionsFromSendOtpMailOptionsBuilder: MailDeliveryOptionsFromSendOtpMailOptionsBuilder;

  constructor(
    @inject(findManyUsersOutputPortSymbol)
    findManyUsersOutputPort: FindManyUsersOutputPort,
    @inject(mailDeliveryOutputPortSymbol)
    mailDeliveryOutputPort: MailDeliveryOutputPort,
    @inject(MailDeliveryOptionsFromSendOtpMailOptionsBuilder)
    mailDeliveryOptionsFromSendOtpMailOptionsBuilder: MailDeliveryOptionsFromSendOtpMailOptionsBuilder,
  ) {
    this.#findManyUsersOutputPort = findManyUsersOutputPort;
    this.#mailDeliveryOutputPort = mailDeliveryOutputPort;
    this.#mailDeliveryOptionsFromSendOtpMailOptionsBuilder =
      mailDeliveryOptionsFromSendOtpMailOptionsBuilder;
  }

  public build(): AppBetterAuthOptions {
    const options: AppBetterAuthOptions = {
      database: prismaAdapter(new PrismaClient(), {
        provider: 'postgresql',
      }),
      emailAndPassword: {
        enabled: true,
      },
      logger: {
        disabled: false,
        level: 'debug',
      },
      plugins: [
        admin(),
        emailOTP({
          sendVerificationOTP: async ({
            email,
            otp,
            type,
          }: {
            email: string;
            otp: string;
            type: 'sign-in' | 'email-verification' | 'forget-password';
          }): Promise<void> => {
            await this.#mailDeliveryOutputPort.send(
              this.#mailDeliveryOptionsFromSendOtpMailOptionsBuilder.build({
                email,
                otp,
                type,
              }),
            );
          },
        }),
        organization({
          allowUserToCreateOrganization: async (
            user: PrettifyDeep<InferUser<AppBetterAuthOptions>>,
          ) => {
            const [domainUser]: User[] =
              await this.#findManyUsersOutputPort.findMany({
                id: [user.id],
              });

            return domainUser?.role === BETTER_AUTH_ADMIN_ROLE;
          },
        }),
        openAPI(),
        twoFactor(),
      ],
      trustedOrigins: ['*'],
    } satisfies BetterAuthOptions;

    return options;
  }
}

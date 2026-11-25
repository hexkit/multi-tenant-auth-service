import { beforeAll, describe, expect, it, type Mocked, vitest } from 'vitest';

import {
  type Environment,
  type EnvironmentService,
  type MailConfig,
} from '@multi-tenant-auth-service/auth-env';
import { type MailDeliveryOptions } from '@multi-tenant-auth-service/mail-application';

import { type SendUserCreatedMailOptions } from '../models/SendUserCreatedMailOptions.js';
import { MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder } from './MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder.js';

describe(MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder, () => {
  let environmentFixture: Environment;

  let environmentServiceMock: Mocked<EnvironmentService>;
  let mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder: MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder;

  beforeAll(() => {
    environmentFixture = {
      mail: {
        defaultAddress: 'default@example.com',
      } as Partial<MailConfig>,
    } as Partial<Environment> as Environment;

    environmentServiceMock = {
      getEnvironment: vitest.fn(),
    } as Partial<Mocked<EnvironmentService>> as Mocked<EnvironmentService>;

    environmentServiceMock.getEnvironment.mockReturnValue(environmentFixture);

    mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder =
      new MailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder(
        environmentServiceMock,
      );
  });

  describe('.build', () => {
    let sendUserCreatedMailOptionsFixture: SendUserCreatedMailOptions;

    beforeAll(() => {
      sendUserCreatedMailOptionsFixture = {
        email: 'mail@example.com',
        name: 'username',
        password: 'initial-password',
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = mailDeliveryOptionsFromSendUserCreatedMailOptionsBuilder.build(
          sendUserCreatedMailOptionsFixture,
        );
      });

      it('should return MailDeliveryOptions', () => {
        const expected: MailDeliveryOptions = {
          from: environmentFixture.mail.defaultAddress,
          html: expect.stringContaining(
            sendUserCreatedMailOptionsFixture.password,
          ) as string,
          subject: expect.any(String) as string,
          to: [sendUserCreatedMailOptionsFixture.email],
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });
});

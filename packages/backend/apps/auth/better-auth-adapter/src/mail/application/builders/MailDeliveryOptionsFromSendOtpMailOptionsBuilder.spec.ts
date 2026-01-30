import { beforeAll, describe, expect, it, Mocked, vitest } from 'vitest';

import {
  type Environment,
  EnvironmentService,
  type MailConfig,
} from '@multi-tenant-auth-service/auth-env';
import { MailDeliveryOptions } from '@multi-tenant-auth-service/mail-application';

import { SendOtpMailOptions } from '../models/SendOtpMailOptions.js';
import { MailDeliveryOptionsFromSendOtpMailOptionsBuilder } from './MailDeliveryOptionsFromSendOtpMailOptionsBuilder.js';

describe(MailDeliveryOptionsFromSendOtpMailOptionsBuilder, () => {
  let environmentFixture: Environment;

  let environmentServiceMock: Mocked<EnvironmentService>;
  let mailDeliveryOptionsFromSendOtpMailOptionsBuilder: MailDeliveryOptionsFromSendOtpMailOptionsBuilder;

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

    mailDeliveryOptionsFromSendOtpMailOptionsBuilder =
      new MailDeliveryOptionsFromSendOtpMailOptionsBuilder(
        environmentServiceMock,
      );
  });

  describe('.build', () => {
    let sendOtpMailOptionsFixture: SendOtpMailOptions;

    beforeAll(() => {
      sendOtpMailOptionsFixture = {
        email: 'mail@example.com',
        otp: 'otp-fixture',
        type: 'forget-password',
      };
    });

    describe('when called', () => {
      let result: unknown;

      beforeAll(() => {
        result = mailDeliveryOptionsFromSendOtpMailOptionsBuilder.build(
          sendOtpMailOptionsFixture,
        );
      });

      it('should return MailDeliveryOptions', () => {
        const expected: MailDeliveryOptions = {
          from: environmentFixture.mail.defaultAddress,
          html: expect.stringContaining(
            sendOtpMailOptionsFixture.otp,
          ) as unknown as string,
          subject: expect.any(String) as unknown as string,
          to: [sendOtpMailOptionsFixture.email],
        };

        expect(result).toStrictEqual(expected);
      });
    });
  });
});

import {
  type MailDeliveryOptions,
  type MailDeliveryOutputPort,
} from '@multi-tenant-auth-service/mail-application';
import {
  retry,
  RetryOptionsStrategyKind,
} from '@multi-tenant-auth-service/retry';
import { inject, injectable } from 'inversify';
import {
  type Transporter,
  type SendMailOptions,
  type SentMessageInfo,
} from 'nodemailer';

import { transporterSymbol } from '../models/transporterSymbol.js';

@injectable()
export class MailDeliveryNodeMailerAdapter implements MailDeliveryOutputPort {
  readonly #transporter: Transporter<SentMessageInfo>;

  constructor(
    @inject(transporterSymbol)
    transporter: Transporter<SentMessageInfo>,
  ) {
    this.#transporter = transporter;
  }

  public async send(deliveryOptions: MailDeliveryOptions): Promise<void> {
    const mailOptions: SendMailOptions =
      this.#buildMailOptions(deliveryOptions);

    await retry({
      operation: async () => {
        await this.#transporter.sendMail(mailOptions);
      },
      strategy: {
        factor: 2,
        initialDelayMs: 1000,
        kind: RetryOptionsStrategyKind.exponential,
        maxAttempts: 5,
      },
    });
  }

  #buildMailOptions(deliveryOptions: MailDeliveryOptions): SendMailOptions {
    return {
      from: deliveryOptions.from,
      html: deliveryOptions.html,
      subject: deliveryOptions.subject,
      text: deliveryOptions.text,
      to: deliveryOptions.to,
    };
  }
}

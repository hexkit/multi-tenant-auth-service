import { type MailDeliveryOptions } from '../../models/MailDeliveryOptions.js';

export interface MailDeliveryOutputPort {
  send(deliveryOptions: MailDeliveryOptions): Promise<void>;
}

export const mailDeliveryOutputPortSymbol: symbol = Symbol.for(
  'MailDeliveryOutputPort',
);

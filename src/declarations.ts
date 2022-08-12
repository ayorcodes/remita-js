import { IMakePaymentResponse } from "./modules/payments/invoice/invoice.responses";

export {};

interface IMakePaymentDto {
  key: string;
  processRrr: boolean;
  transactionId?: string;
  extendedData: Record<string, unknown>;
  onSuccess: (dto: IMakePaymentResponse) => void;
  onError: (dto: IMakePaymentResponse) => void;
  onClose: () => void;
}

declare global {
  interface Window {
    RmPaymentEngine: {
      init: (dto: IMakePaymentDto) => {
        showPaymentWidget: () => void;
      };
    };
  }
}

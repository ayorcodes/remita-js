import { IBaseResponse } from "../../../shared/base-response";

export interface ICreateInvoiceResponse extends IBaseResponse {
  RRR: string;
  hash: string;
}

export interface InvoiceStatusResponse extends IBaseResponse {
  amount: number;
  RRR: string;
  orderId: string;
  transactiontime: string;
}

export interface IMakePaymentResponse {
  amount: number;
  message: string;
  paymentReference: string;
  processorId: string;
  transactionId: string;
}

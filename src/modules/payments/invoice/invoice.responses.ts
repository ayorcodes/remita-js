import { IBaseResponse } from '../../../shared/base-response';

export interface ICreateInvoiceResponse extends IBaseResponse {
  RRR: string;
}

export interface InvoiceStatusResponse extends IBaseResponse {
  amount: number;
  RRR: string;
  orderId: string;
  transactiontime: string;
}

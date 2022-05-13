import { IBaseResponse } from '../../../shared/base-response';

export interface ICreateMandateResponse extends IBaseResponse {
  requestId: string;
  mandateId: string;
}

export interface IStopMandateResponse extends IBaseResponse {
  requestId: string;
  mandateId: string;
}

export interface IRequestMandateOTPResponse extends IBaseResponse {
  requestId: string;
  mandateId: string;
  authParams: Record<string, any>[];
  remitaTransRef: string;
}

export interface IValidateMandateOTPResponse extends IBaseResponse {
  mandateId: string;
}

export interface IFetchMandateStatusResponse {
  endDate: string;
  requestId: string;
  mandateId: string;
  registrationDate: string;
  isActive: boolean;
  activationDate: string;
  startDate: string;
}

export interface IFetchMandatePaymentHistoryResponse extends IBaseResponse {
  requestId: string;
  mandateId: string;
  totalTransactionCount: number;
  totalAmount: number;
  paymentDetails: PaymentDetail[];
}

export interface PaymentDetail {
  amount: string;
  lastStatusUpdateTime: string;
  status: string;
  statuscode: string;
  RRR: string;
  transactionRef: string;
}

export interface ISendDebitInstructionResponse extends IBaseResponse {
  RRR: string;
  requestId: string;
  mandateId: string;
  transactionRef: number;
}

export interface IFetchDebitStatusResponse extends IBaseResponse {
  requestId: string;
  mandateId: string;
  amount: string;
  lastStatusUpdateTime: string;
  RRR: string;
  transactionRef: string;
}

export interface ICancelDebitInstructionResponse extends IBaseResponse {
  requestId: string;
  mandateId: string;
}

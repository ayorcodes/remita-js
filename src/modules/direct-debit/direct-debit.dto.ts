export class ICreateMandate {
  payerName: string;
  payerEmail: string;
  payerPhone: string;
  payerBankCode: string;
  payerAccount: string;
  amount: string;
  startDate: string;
  endDate: string;
  mandateType: string = 'DD';
  maxNoOfDebits: number;
  customFields: CustomField[];
}

export interface IStopMandate {
  mandateId: string;
  requestId: string;
}

export interface IRequestMandateOTP {
  mandateId: string;
  requestId: string;
}

export interface IValidateMandateOTP {
  remitaTransRef: string;
  authParams: Record<string, any>[];
}

export interface IMandatePaymentHistory {
  mandateId: string;
  requestId: string;
}

export interface CustomField {
  name: string;
  value: string;
  type: string;
}

export interface IFetchMandateStatus {
  mandateId: string;
  requestId: string;
}

export interface ICreateDebitInstruction {
  mandateId: string;
  totalAmount: string;
  fundingAccount: string;
  fundingBankCode: string;
}

export interface IGetDebitInstructionStatus {
  mandateId: string;
  requestId: string;
}

export interface ICancelDebitInstruction {
  mandateId: string;
  requestId: string;
  transactionRef: string;
}

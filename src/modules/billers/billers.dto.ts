export interface IValidateRequest {
  customFields: CustomField[];
  // billId: string;
  serviceTypeId: string;
  amount: number;
  payerPhone: string;
  currency: string;
  payerName: string;
  payerEmail: string;
}

export interface CustomField {
  id: string;
  values: Value[];
}

export interface Value {
  value: string;
  quantity: number;
  amount: number;
}

export interface ISendPaymentNotification {
  rrr: string;
  incomeAccount: string;
  debittedAccount: string;
  paymentAuthCode: string;
  paymentChannel: string;
  tellerName: string;
  branchCode: string;
  amountDebitted: string;
  fundingSource: string;
  hash: string;
}

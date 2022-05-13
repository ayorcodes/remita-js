export interface CustomField {
  id: string;
  values: Value[];
}

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

export interface IValidateCustomer {
  billPaymentProductId: string;
  customerId: string;
}

export interface IInitiateTransaction {
  billPaymentProductId: string;
  amount: number;
  transactionRef: string;
  name: string;
  email: string;
  phoneNumber: string;
  customerId: string;
  metadata?: Metadata;
}

export interface Metadata {
  customFields?: CustomField2[];
}

export interface CustomField2 {
  variable_name: string;
  value: string;
}

export interface ICreateBillPaymentNotification {
  rrr: string;
  transactionRef: string;
  amount: number;
  channel: string;
  metadata: Metadata2;
}

export interface Metadata2 {
  fundingSource: string;
}

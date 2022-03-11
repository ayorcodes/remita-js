export interface IAccountLookupResponse {
  sourceAccount: string;
  sourceAccountName: string;
  sourceBankCode: string;
}

export interface ICreateSinglePaymentResponse {
  amount: number;
  transactionRef: string;
  transactionDescription: string;
  channel: string;
  currency: string;
  destinationAccount: string;
  destinationAccountName: string;
  destinationBankCode: string;
  destinationEmail: string;
  sourceAccount: string;
  sourceAccountName: string;
  sourceBankCode: string;
  originalAccountNumber: string;
  originalBankCode: string;
  customReference: string;
}

export interface IFetchSinglePaymentResponse {
  authorizationId: string;
  transactionRef: string;
  amount: number;
  feeAmount: number;
  paymentStatus: string;
  transactionDescription: string;
  transactionDate: string;
  paymentDate: string;
  currency: string;
  destinationAccount: string;
  destinationBankCode: string;
  sourceAccount: string;
  sourceBankCode: string;
}

export interface ICreateBulkPaymentResponse {
  batchRef: string;
  totalAmount: number;
  authorizationId: string;
  transactionDate: string;
}

export interface IFetchBulkPaymentResponse {
  batchRef: string;
  totalAmount: number;
  feeAmount: number;
  authorizationId: string;
  transactionDate: string;
  transactionDescription: string;
  sourceAccount: string;
  currency: string;
  paymentStatus: string;
  transactions: Transaction[];
}

export interface Transaction {
  amount: number;
  transactionRef: string;
  paymentDate: string;
  paymentStatus: string;
  statusMessage: string;
}

export interface IFetchActiveBanksResponse {
  responseId: string;
  responseCode: string;
  responseDescription: string;
  banks: Bank[];
}

export interface Bank {
  bankCode: string;
  bankName: string;
  bankAccronym?: string;
  type: string;
}

export interface IAccountLookup {
  sourceAccount: string;
  sourceBankCode: string;
}

export interface ICreateSinglePayment {
  type: 'single';
  amount: number;
  // transactionRef: number;
  // transactionRef: string;
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

export interface ICreateBulkPayment {
  type: 'bulk';
  // batchRef: number;
  totalAmount: number;
  sourceAccount: string;
  sourceAccountName: string;
  sourceBankCode: string;
  currency: string;
  sourceNarration: string;
  originalAccountNumber: string;
  originalBankCode: string;
  customReference: string;
  transactions: Transaction[];
}

export interface Transaction {
  amount: number;
  transactionRef: string;
  destinationAccount: string;
  destinationAccountName: string;
  destinationBankCode: string;
  destinationNarration: string;
}

export interface IFetchSinglePayment {
  type: 'single';
  transRef: string;
}

export interface IFetchBulkPayment {
  type: 'bulk';
  batchRef: string;
}

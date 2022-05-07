export interface IFetchSalaryHistory {
  authorisationCode: string;
  firstName: string;
  lastName: string;
  middleName: string;
  accountNumber: string;
  bankCode: string;
  bvn: string;
  authorisationChannel: string;
}

export interface IFetchUserByNIN {
  // refId: string;
  // authorisationCode: string;
  // authorisationChannel: string;
  // customFields: CustomField[];
  nin: string;
  authorisationCode: string;
  authorisationChannel: string;
}

export interface CustomField {
  value: string;
  key: string;
}

export interface ICreateLoanDisbursementNotification {
  customerId: string;
  authorisationCode: string;
  authorisationChannel: string;
  phoneNumber: string;
  accountNumber: string;
  currency: string;
  loanAmount: number;
  collectionAmount: number;
  dateOfDisbursement: string;
  dateOfCollection: string;
  totalCollectionAmount: number;
  numberOfRepayments: number;
  bankCode: string;
}

export interface IFetchLoanRepaymentHistory {
  authorisationCode: string;
  customerId: string;
  mandateRef: string;
}

export interface IStopLoanCollection {
  authorisationCode: string;
  customerId: string;
  mandateReference: string;
}

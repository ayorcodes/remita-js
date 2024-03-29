export interface ICreateLoanDisbursementNotificationResponse {
  status: any;
  hasData: boolean;
  responseId: string;
  responseDate: string;
  requestDate: string;
  responseCode: string;
  responseMsg: string;
  authorisationCode: string;
  accountNumber: string;
  bankCode: string;
  amount: string;
  customerId: string;
  mandateReference: string;
}

export interface RepaymentModel {
  transactionamount: number;
  deductiondate: string;
  paymentstatus: string;
}

export interface IFetchLoanRepaymentHistoryResponse {
  status: string;
  hasData: boolean;
  responseId: string;
  responseDate: string;
  requestDate: string;
  responseCode: string;
  responseMsg: string;
  customerId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  loanMandateReference: string;
  totalDisbursed: number;
  outstandingLoanBal: number;
  loanRepaymentRef: any;
  employerName: string;
  salaryAccount: string;
  authorisationCode: string;
  salaryBankCode: string;
  disbursementAccountBank: string;
  collectionStartDate: string;
  dateOfDisbursement: string;
  disbursementAccount: string;
  lenderDetails: string;
  repayment: RepaymentModel[];
}

export interface IStopLoanCollectionResponse {
  status: string;
  hasData: boolean;
  responseId: string;
  responseDate: string;
  requestDate: string;
  responseCode: string;
  responseMsg: string;
  customerId: string;
  mandateReference: string;
}

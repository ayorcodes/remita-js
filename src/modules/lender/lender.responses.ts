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

export interface IFetchSalaryHistoryResponse {
  status: string;
  hasData: boolean;
  responseId: string;
  responseDate: string;
  requestDate: string;
  responseCode: string;
  responseMsg: string;
  customerId: string;
  accountNumber: string;
  bankCode: string;
  bvn: any;
  companyName: string;
  customerName: string;
  category: any;
  firstPaymentDate: string;
  salaryCount: string;
  salaryPaymentDetails: SalaryPaymentDetail[];
  loanHistoryDetails: LoanHistoryDetail[];
  originalCustomerId: string;
}

export interface SalaryPaymentDetail {
  paymentDate: string;
  amount: string;
  accountNumber: string;
  bankCode: string;
}

export interface LoanHistoryDetail {
  loanProvider: string;
  loanAmount: number;
  outstandingAmount: number;
  loanDisbursementDate: string;
  status: string;
  repaymentAmount: number;
  repaymentFreq: string;
}

export interface IFetchUserByNINResponse {
  status: string;
  message: string;
  poBox: any;
  biometric: any;
  email: string;
  address: any;
  staffId: any;
  villageTownCity: any;
  dateCreated: any;
  gender: any;
  stateOfOriginCode: any;
  stateOfResidenceCode: string;
  dateOfBirth: string;
  designation: any;
  firstName: string;
  zipCode: any;
  employer: any;
  lgaOfResidenceCode: string;
  houseName: any;
  title: any;
  countryOfResidenceCode: any;
  middleName: any;
  nationality: string;
  maritalStatus: string;
  nextOfKin: string;
  mobileNumber: any;
  nin: string;
  pin: any;
  lastName: string;
  bvn: any;
  transactionRef: any;
  photo: string;
  signature: string;
  countryOfBirth: string;
  birthState: string;
  employmentStatus: string;
  languageSpoken: any;
  profession: string;
  lgaofOriginCode: any;
}

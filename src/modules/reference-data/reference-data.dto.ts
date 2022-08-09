export interface IFetchSalaryHistoryByPhoneNumber {
  type: 'phoneNumber';
  authorisationCode: string;
  phoneNumber: string;
  authorisationChannel: string;
}

export interface IFetchSalaryHistoryByAccountNumber {
  type: 'accountNumber';
  authorisationCode: string;
  accountNumber: string;
  bankCode: string;
  authorisationChannel: string;
}

export interface IFetchUserByNIN {
  nin: string;
  authorisationCode: string;
  authorisationChannel: string;
}

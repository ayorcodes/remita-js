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

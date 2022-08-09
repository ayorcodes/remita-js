import { initializeRemita, ReferenceDataService } from '../src';
jest.setTimeout(10000);

let referenceDataService: ReferenceDataService;

// let authorisationCode = '334523457';
let authorisationCode = Math.floor(Math.random() * 1101233).toString();
let mandateReference = '';
let customerId = '456783897';

describe('Reference Data Tests', () => {
  beforeAll(async () => {
    await initializeRemita({
      environment: 'dev',
    });

    referenceDataService = new ReferenceDataService();
  });

  it('should find test', () => {
    expect(2).toBeLessThanOrEqual(2);
  });

  it('should fetch salary history by phoneNumber', async () => {
    const response = await referenceDataService.getSalaryHistory({
      type: 'phoneNumber',
      authorisationCode: Math.floor(Math.random() * 1101233).toString(),
      phoneNumber: '07038684773',
      authorisationChannel: 'USSD',
    });

    expect(response.accountNumber).toBeDefined();
    expect(response.salaryPaymentDetails.length).toBeGreaterThan(5);
    expect(response.loanHistoryDetails.length).toBeGreaterThan(5);
  });

  it('should fetch salary history by accountNumber', async () => {
    const response = await referenceDataService.getSalaryHistory({
      type: 'accountNumber',
      authorisationCode: Math.floor(Math.random() * 1101233).toString(),
      accountNumber: '1234657893',
      bankCode: '214',
      authorisationChannel: 'USSD',
    });

    expect(response.accountNumber).toBeDefined();
    expect(response.salaryPaymentDetails.length).toBeGreaterThan(5);
    expect(response.loanHistoryDetails.length).toBeGreaterThan(5);
  });

  // it('should fetch user by NIN', async () => {
  //   const response = await referenceDataService.getUserInfoByNIN({
  //     // nin: '98637126031',
  //     nin: '0123456789',
  //     authorisationCode: '67777777',
  //     authorisationChannel: 'USSD',
  //   });
  // });
});

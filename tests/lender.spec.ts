import { initializeRemita, LenderService } from '../src';

jest.setTimeout(10000);
let lenderService: LenderService;

let authorisationCode = '334523457';
let mandateReference = '';
let customerId = '456783897';

describe('Lender Service Tests', () => {
  beforeAll(async () => {
    await initializeRemita({
      environment: 'dev',
    });

    lenderService = new LenderService();
  });

  it('should fetch salary history', async () => {
    const response = await lenderService.fetchSalaryHistory({
      authorisationCode,
      firstName: 'Teresa',
      lastName: 'Stoker',
      middleName: 'R',
      accountNumber: '5012284010',
      bankCode: '023',
      bvn: '22222222223',
      authorisationChannel: 'USSD',
    });
  });

  it('should fetch user by NIN', async () => {
    const response = await lenderService.fetchUserByNIN({
      // nin: '98637126031',
      nin: '0123456789',
      authorisationCode: '67777777',
      authorisationChannel: 'USSD',
    });
  });

  it('should create Loan Disbursement Notification', async () => {
    const response = await lenderService.loanDisbursementNotification({
      customerId,
      authorisationCode,
      authorisationChannel: 'USSD',
      phoneNumber: '07038684773',
      accountNumber: '1234657893',
      currency: 'NGN',
      loanAmount: 2000,
      collectionAmount: 2100,
      dateOfDisbursement: '11-06-2020 10:16:18+0000',
      dateOfCollection: '11-06-2020 10:16:18+0000',
      totalCollectionAmount: 2100,
      numberOfRepayments: 1,
      bankCode: '011',
    });
    mandateReference = response.mandateReference;
    expect(response.mandateReference).toBeDefined();
  });

  it('should fetch loan repayment history', async () => {
    const response = await lenderService.fetchLoanRepaymentHistory({
      authorisationCode,
      mandateRef: mandateReference,
      customerId,
    });
    expect(response.dateOfDisbursement).toBeDefined();
  });

  it('should stop loan collection', async () => {
    const response = await lenderService.stopLoanCollection({
      authorisationCode,
      mandateReference,
      customerId,
    });

    expect(response.hasData).toBeDefined();
  });

  // it('should fetch mandate by id', async () => {
  //   const response = await lenderService.loanDisbursementNotification({
  //     customerId: '456783897',
  //     authorisationCode: '334523457',
  //     authorisationChannel: 'USSD',
  //     phoneNumber: '07038684773',
  //     accountNumber: '1234657893',
  //     currency: 'NGN',
  //     loanAmount: 2000,
  //     collectionAmount: 2100,
  //     dateOfDisbursement: '11-06-2020 10:16:18+0000',
  //     dateOfCollection: '11-06-2020 10:16:18+0000',
  //     totalCollectionAmount: 2100,
  //     numberOfRepayments: 1,
  //     bankCode: '011',
  //   });
  //   expect(response.mandateReference).toBeDefined();
  // });
});

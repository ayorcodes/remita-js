import { InflightCollectionsService, initializeRemita } from '../src';
jest.setTimeout(10000);

let authorisationCode = '334523457';
let mandateReference = '';
let customerId = '456783897';

let inflightCollectionsService: InflightCollectionsService;
describe('Inflight Collections Tests', () => {
  beforeAll(async () => {
    await initializeRemita({
      environment: 'dev',
    });

    // await initializeRemita({
    //   environment: 'production',
    //   apiKey: process.env.REMITA_API_KEY,
    //   api_token: process.env.REMITA_API_TOKEN,
    //   merchantId: process.env.REMITA_MERCHANT_ID,
    //   serviceTypeId: process.env.REMITA_SERVICE_TYPE_ID,
    //   publicKey: process.env.REMITA_PUBLIC_KEY,
    //   auth: {
    //     password: process.env.REMITA_PASSWORD,
    //     username: process.env.REMITA_USERNAME
    //   }
    // });

    inflightCollectionsService = new InflightCollectionsService();
  });

  it('should create Loan Disbursement Notification', async () => {
    const response =
      await inflightCollectionsService.loanDisbursementNotification({
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
    const response = await inflightCollectionsService.getLoanRepaymentHistory({
      authorisationCode,
      mandateRef: mandateReference,
      customerId,
    });
    expect(response.dateOfDisbursement).toBeDefined();
  });

  it('should stop loan collection', async () => {
    const response = await inflightCollectionsService.stopLoanCollection({
      authorisationCode,
      mandateReference,
      customerId,
    });

    expect(response.hasData).toBeDefined();
  });
});

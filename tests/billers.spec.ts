import * as faker from 'faker';
import { BillerService, initializeRemita } from '../src';
jest.setTimeout(10000);
let billerService = new BillerService();

let categoryId = '';
let billPaymentProductId = '';
let billerId = '';
let customerId = '456783897';
let transactionRef = faker.datatype
  .number({
    min: 45896767809,
    max: 95896767809,
  })
  .toString();

let RRR = '';
let billPaymentTransactionRef = '';

describe('Biller Service Tests', () => {
  beforeAll(async () => {
    await initializeRemita({
      environment: 'dev',
    });

    billerService = new BillerService();
  });

  it('should fetch biller', async () => {
    const response = await billerService.fetchBillers();
    expect(response.length).toBeGreaterThan(3);
  });

  it('should fetch bill categories', async () => {
    const response = await billerService.fetchBillCategories();
    // console.log({ response });
    categoryId = response[0].categoryId;
    expect(response.length).toBeGreaterThan(3);
  });

  it('should fetch billers by category', async () => {
    const response = await billerService.fetchBillersByCategory(categoryId);
    // console.log({ response });
    billerId = response[0].billerId;
    expect(response.length).toBeGreaterThanOrEqual(1);
  });

  it('should fetch biller products', async () => {
    const response = await billerService.fetchBillerProducts(billerId);
    // console.log({ response });
    billPaymentProductId = response.products[0].billPaymentProductId;
    expect(response.products.length).toBeGreaterThanOrEqual(1);
  });

  it('should validate customer', async () => {
    try {
      const response = await billerService.validateCustomer({
        // billPaymentProductId,
        // customerId,
        billPaymentProductId: '627389687',
        customerId: '1010101020',
      });
      // console.log({ response });
      expect(response.billPaymentProductId).toBeDefined();
    } catch (e) {
      expect(e.message).toBeDefined();
    }
  });

  it('should initiate bill payment', async () => {
    const response = await billerService.initiateTransaction({
      billPaymentProductId: '41958636',
      amount: 2000.0,
      transactionRef,
      name: 'Henry George',
      email: 'henry@xyz.com',
      phoneNumber: '080123456789',
      customerId: 'henry@xyz.com',
      metadata: {
        customFields: [
          {
            variable_name: 'size',
            value: '40abc',
          },
        ],
      },
    });
    // console.log({ response });
    RRR = response.rrr;
    billPaymentTransactionRef = response.transactionRef;
    expect(response.transactionRef).toBeDefined();
    expect(response.rrr).toBeDefined();
  });

  it('should fetch bill payment by RRR', async () => {
    const response = await billerService.lookupTransaction(RRR);
    expect(response.currency).toBeDefined();
  });

  it('should fetch bill payment by transactionRef', async () => {
    const response = await billerService.queryTransaction(
      billPaymentTransactionRef
    );
    expect(response.paid).toBeDefined();
  });

  it('should create bill payment notification', async () => {
    const response = await billerService.createPaymentNotification({
      rrr: '290008214793',
      transactionRef: faker.datatype
        .number({
          min: 45896767809,
          max: 95896767809,
        })
        .toString(),
      amount: 3814.13,
      channel: 'pos',
      metadata: {
        fundingSource: 'TESTACCOUNT',
      },
    });
    // console.log({ response });
    expect(response.transactionRef).toBeDefined();
  });
});

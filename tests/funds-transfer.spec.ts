import * as faker from 'faker';
import { FundsTransferService, initializeRemita } from '../src';
import {
  ICreateBulkPaymentResponse,
  ICreateSinglePaymentResponse,
} from '../src/modules/funds-transfer/funds-transfer.response';
jest.setTimeout(10000);

let fundsTransferService: FundsTransferService;
let transactionRef = '';
let batchRef = '';

// Math.floor(Math.random() * 1101233).toString()

describe('Funds Transfer Tests', () => {
  beforeAll(async () => {
    await initializeRemita({
      environment: 'dev',
    });

    fundsTransferService = new FundsTransferService();
  });

  it('should lookup an account', async () => {
    const response = await fundsTransferService.accountLookup({
      sourceAccount: '4589999044',
      sourceBankCode: '044',
    });

    expect(response.sourceAccountName).toBeDefined();
  });

  it('should create a single transaction', async () => {
    const response = await fundsTransferService.createPayment({
      type: 'single',
      amount: 1000,
      // transactionRef: faker.datatype.uuid().split('-').join(''),
      // transactionRef: Math.floor(Math.random() * 1101233),
      transactionDescription: 'Payment for services',
      channel: 'WEB',
      currency: 'NGN',
      destinationAccount: '4589999044',
      destinationAccountName: 'Doe John',
      destinationBankCode: '044',
      destinationEmail: 'Doe.john@specs.com',
      sourceAccount: '8909090989',
      sourceAccountName: 'Femi John',
      sourceBankCode: '058',
      originalAccountNumber: '8909090989',
      originalBankCode: '058',
      customReference: '',
    });

    expect(response.transactionRef).toBeDefined();
    transactionRef = response.transactionRef;
  });

  it('should fetch single transaction status by RRR', async () => {
    const response = await fundsTransferService.getPaymentStatus({
      type: 'single',
      transRef: transactionRef,
    });
    expect(response.authorizationId).toBeDefined();
  });

  it('should create a bulk transaction', async () => {
    const response = await fundsTransferService.createPayment({
      type: 'bulk',
      totalAmount: 4500,
      sourceAccount: '8909090989',
      sourceAccountName: 'ABC',
      sourceBankCode: '058',
      currency: 'NGN',
      sourceNarration: 'Bulk Transfer',
      originalAccountNumber: '8909090989',
      originalBankCode: '058',
      customReference: '',
      transactions: [
        {
          amount: 2500,
          transactionRef: 'ngnerngkng',
          destinationAccount: '0037475942',
          destinationAccountName: 'Kelvin John',
          destinationBankCode: '058',
          destinationNarration: 'Bulk Transfer',
        },
        {
          amount: 1500,
          transactionRef: 'gknbergbeorg',
          destinationAccount: '0037475942',
          destinationAccountName: 'Martin John',
          destinationBankCode: '058',
          destinationNarration: 'Bulk Transfer',
        },
        {
          amount: 500,
          transactionRef: 'rgnbergwrejgpeg',
          destinationAccount: '0037475942',
          destinationAccountName: 'Mike John',
          destinationBankCode: '058',
          destinationNarration: 'Bulk Transfer',
        },
      ],
    });

    expect(response.batchRef).toBeDefined();
    batchRef = response.batchRef;
  });

  it('should fetch bulk transaction status by RRR', async () => {
    const response = await fundsTransferService.getPaymentStatus({
      type: 'bulk',
      batchRef,
    });
    expect(response.authorizationId).toBeDefined();
  });

  it('should fetch active banks', async () => {
    const response = await fundsTransferService.getActiveBanks();
    expect(response.banks.length).toBeGreaterThan(5);
  });
});

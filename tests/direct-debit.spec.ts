import { DirectDebitService, initializeRemita } from '../src/index';
import * as faker from 'faker';
import dayjs from 'dayjs';
jest.setTimeout(10000);

let mandateId: string = '';
let mandateRequestId: string = '';
let debitInstructionRequestId: string = '';
let remitaTransRef: string = '';
let transactionRef: number = 0;
let directDebitService: DirectDebitService;

describe('Direct Debit Tests', () => {
  beforeAll(async () => {
    await initializeRemita({
      environment: 'dev',
    });

    directDebitService = new DirectDebitService();
  });

  it('should generate mandate', async () => {
    const response = await directDebitService.createMandate({
      payerName: 'Oshadami Mike',
      payerEmail: 'oshadami@example.com',
      payerPhone: '08012345678',
      payerBankCode: '057',
      payerAccount: '0035509366',
      amount: '5000',
      startDate: dayjs().format('DD/MM/YYYY'),
      endDate: dayjs().add(5, 'day').format('DD/MM/YYYY'),
      maxNoOfDebits: 5,
      customFields: [],
      mandateType: 'DD',
    });
    mandateRequestId = response.requestId;
    mandateId = response.mandateId;
    expect(response.mandateId).toBeDefined();
  });
  // it('should generate print mandate', async () => {});
  it('should request mandate otp', async () => {
    const response = await directDebitService.requestMandateOTP({
      mandateId,
      requestId: mandateRequestId,
    });
    remitaTransRef = response.remitaTransRef;
    expect(response.remitaTransRef).toBeDefined();
    expect(response.authParams).toBeDefined();
  });
  it('should validate mandate otp', async () => {
    const response = await directDebitService.validateMandateOTP({
      remitaTransRef,
      authParams: [
        {
          param1: 'OTP',
          value: '1234',
        },
        {
          param2: 'CARD',
          value: '0441234567890',
        },
      ],
    });

    expect(response.mandateId).toBeDefined();
  });
  it('should fetch mandate status', async () => {
    const response = await directDebitService.fetchMandateStatus({
      mandateId,
      requestId: mandateRequestId,
    });
    expect(response.isActive).toBe(true);
  });

  it('should send debit instruction', async () => {
    const response = await directDebitService.sendDebitInstruction({
      fundingAccount: '0035509366',
      fundingBankCode: '057',
      mandateId,
      totalAmount: '1000',
    });
    debitInstructionRequestId = response.requestId;
    transactionRef = response.transactionRef;
    expect(response.RRR).toBeDefined();
    expect(response.transactionRef).toBeDefined();
  });
  it('should fetch debit instruction status', async () => {
    const response = await directDebitService.fetchDebitStatus({
      mandateId,
      requestId: debitInstructionRequestId,
    });
    expect(response.RRR).toBeDefined();
    expect(response.amount).toBeDefined();
  });
  it('should fetch mandate payment history', async () => {
    const response = await directDebitService.mandatePaymentHistory({
      mandateId,
      requestId: mandateRequestId,
    });
    // console.log({ response });
    expect(response.totalTransactionCount).toBeGreaterThanOrEqual(1);
  });

  it('should cancel debit instruction', async () => {
    try {
      await directDebitService.cancelDebitInstruction({
        mandateId,
        requestId: debitInstructionRequestId,
        transactionRef: transactionRef.toString(),
      });
    } catch (e) {
      expect(e.message).toEqual('Invalid Transaction');
    }
  });

  it('should stop a mandate', async () => {
    const response = await directDebitService.stopMandate({
      mandateId,
      requestId: mandateRequestId,
    });
    expect(response.mandateId).toBeDefined();
  });
  // it('should ', async () => {});
  // it('should ', async () => {});
});

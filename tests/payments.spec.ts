import { PaymentsService, initializeRemita } from '../src/index';
import * as faker from 'faker';
import dayjs from 'dayjs';
jest.setTimeout(10000);

let paymentsService: PaymentsService;

let standardRRR: string = '';
let splitPaymentRRR: string = '';
let customFieldsRRR: string = '';
let customFieldsSplitPaymentRRR: string = '';
let standardOrderId: string = faker.datatype.uuid().split('-').join('');
let splitPaymentOrderId: string = faker.datatype.uuid().split('-').join('');
let customFieldsOrderId: string = faker.datatype.uuid().split('-').join('');
let customFieldsSplitPaymentOrderId: string = faker.datatype
  .uuid()
  .split('-')
  .join('');

let mandateId: string = '';
let mandateRequestId: string = '';
let debitInstructionRequestId: string = '';
let remitaTransRef: string = '';
let transactionRef: number = 0;

describe('Accept Payments Tests', () => {
  beforeAll(async () => {
    await initializeRemita({
      environment: 'dev',
    });

    paymentsService = new PaymentsService();
  });

  describe('Invoice Tests', () => {
    it('should create a standard invoice', async () => {
      const response = await paymentsService.createInvoice({
        type: 'standard',
        amount: '10000',
        orderId: standardOrderId,
        payerName: 'John Doe',
        payerEmail: 'doe@gmail.com',
        payerPhone: '09062067384',
        description: 'Payment for Septmeber Fees',
      });
      standardRRR = response.RRR;

      expect(response.RRR).toBeDefined();
    });

    it('should create a split_payment invoice', async () => {
      const response = await paymentsService.createInvoice({
        type: 'split_payment',
        amount: '10000',
        orderId: splitPaymentOrderId,
        payerName: 'John Doe',
        payerEmail: 'doe@gmail.com',
        payerPhone: '09062067384',
        description: 'Payment for Septmeber Fees',
        lineItems: [
          {
            lineItemsId: 'itemid1',
            beneficiaryName: 'Alozie Michael',
            beneficiaryAccount: '6020067886',
            bankCode: '058',
            beneficiaryAmount: '7000',
            deductFeeFrom: '1',
          },
          {
            lineItemsId: 'itemid2',
            beneficiaryName: 'Folivi Joshua',
            beneficiaryAccount: '0360883515',
            bankCode: '058',
            beneficiaryAmount: '3000',
            deductFeeFrom: '0',
          },
        ],
      });
      splitPaymentRRR = response.RRR;

      expect(response.RRR).toBeDefined();
    });

    it('should create a custom fields invoice', async () => {
      const response = await paymentsService.createInvoice({
        type: 'custom_fields',
        amount: '10000',
        orderId: customFieldsOrderId,
        payerName: 'John Doe',
        payerEmail: 'doe@gmail.com',
        payerPhone: '09062067384',
        description: 'Payment for Septmeber Fees',
        customFields: [
          {
            name: 'Payer TIN',
            value: '1234567890',
            type: 'ALL',
          },
          {
            name: 'Contract Date',
            value: '2018/06/27',
            type: 'ALL',
          },
          {
            name: 'Tax Period',
            value: '2018/06/20',
            type: 'ALL',
          },
        ],
      });
      customFieldsRRR = response.RRR;

      expect(response.RRR).toBeDefined();
    });

    it('should create a split payment with custom fields invoice', async () => {
      const response = await paymentsService.createInvoice({
        type: 'custom_fields_split_payment',
        amount: '10000',
        orderId: customFieldsSplitPaymentOrderId,
        payerName: 'John Doe',
        payerEmail: 'doe@gmail.com',
        payerPhone: '09062067384',
        description: 'Payment for Septmeber Fees',
        customFields: [
          {
            name: 'Payer TIN',
            value: '1234567890',
            type: 'ALL',
          },
          {
            name: 'Contract Date',
            value: '2018/06/27',
            type: 'ALL',
          },
          {
            name: 'Tax Period',
            value: '2018/06/20',
            type: 'ALL',
          },
        ],
        lineItems: [
          {
            lineItemsId: 'itemid1',
            beneficiaryName: 'Alozie Michael',
            beneficiaryAccount: '6020067886',
            bankCode: '058',
            beneficiaryAmount: '7000',
            deductFeeFrom: '1',
          },
          {
            lineItemsId: 'itemid2',
            beneficiaryName: 'Alozie Michael',
            beneficiaryAccount: '6020067886',
            bankCode: '058',
            beneficiaryAmount: '3000',
            deductFeeFrom: '1',
          },
        ],
      });
      customFieldsSplitPaymentRRR = response.RRR;

      expect(response.RRR).toBeDefined();
    });

    it('should fetch standard invoice status by RRR', async () => {
      const response = await paymentsService.getInvoiceStatus({
        type: 'rrr',
        value: standardRRR,
      });

      expect(response.amount).toBeDefined();
    });

    it('should fetch split payment invoice status by RRR', async () => {
      const response = await paymentsService.getInvoiceStatus({
        type: 'rrr',
        value: splitPaymentRRR,
      });

      expect(response.amount).toBeDefined();
    });

    it('should fetch custom fields invoice status by RRR', async () => {
      const response = await paymentsService.getInvoiceStatus({
        type: 'rrr',
        value: customFieldsRRR,
      });

      expect(response.amount).toBeDefined();
    });

    it('should fetch split payment with custom fields invoice status by RRR', async () => {
      const response = await paymentsService.getInvoiceStatus({
        type: 'rrr',
        value: customFieldsSplitPaymentRRR,
      });

      expect(response.amount).toBeDefined();
    });

    it('should fetch standard invoice status by orderId', async () => {
      const response = await paymentsService.getInvoiceStatus({
        type: 'orderId',
        value: standardOrderId,
      });

      expect(response.amount).toBeDefined();
    });

    it('should fetch split payment invoice status by orderId', async () => {
      const response = await paymentsService.getInvoiceStatus({
        type: 'orderId',
        value: splitPaymentOrderId,
      });

      expect(response.amount).toBeDefined();
    });

    it('should fetch custom fields invoice status by orderId', async () => {
      const response = await paymentsService.getInvoiceStatus({
        type: 'orderId',
        value: customFieldsOrderId,
      });

      expect(response.amount).toBeDefined();
    });

    it('should fetch split payment with custom fields invoice status by orderId', async () => {
      const response = await paymentsService.getInvoiceStatus({
        type: 'orderId',
        value: customFieldsSplitPaymentOrderId,
      });

      expect(response.amount).toBeDefined();
    });

    it('should cancel standard invoice', async () => {
      const response = await paymentsService.cancelInvoice(standardRRR);

      expect(response.status).toBeDefined();
    });

    it('should cancel split payment invoice', async () => {
      const response = await paymentsService.cancelInvoice(splitPaymentRRR);

      expect(response.status).toBeDefined();
    });

    it('should cancel custom fields invoice', async () => {
      const response = await paymentsService.cancelInvoice(customFieldsRRR);

      expect(response.status).toBeDefined();
    });

    it('should cancel split payment with custom fields invoice', async () => {
      const response = await paymentsService.cancelInvoice(
        customFieldsSplitPaymentRRR
      );

      expect(response.status).toBeDefined();
    });
  });

  describe('Debit Mandate Tests', () => {
    it('should generate mandate', async () => {
      const response = await paymentsService.createMandate({
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
      const response = await paymentsService.getMandateOTP({
        mandateId,
        requestId: mandateRequestId,
      });
      remitaTransRef = response.remitaTransRef;
      expect(response.remitaTransRef).toBeDefined();
      expect(response.authParams).toBeDefined();
    });
    it('should validate mandate otp', async () => {
      const response = await paymentsService.validateMandateOTP({
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
      const response = await paymentsService.getMandateStatus({
        mandateId,
        requestId: mandateRequestId,
      });
      expect(response.isActive).toBe(true);
    });

    it('should send debit instruction', async () => {
      const response = await paymentsService.sendDebitInstruction({
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
      const response = await paymentsService.getDebitInstructionStatus({
        mandateId,
        requestId: debitInstructionRequestId,
      });
      expect(response.RRR).toBeDefined();
      expect(response.amount).toBeDefined();
    });
    it('should fetch mandate payment history', async () => {
      const response = await paymentsService.getMandatePaymentHistory({
        mandateId,
        requestId: mandateRequestId,
      });
      // console.log({ response });
      expect(response.totalTransactionCount).toBeGreaterThanOrEqual(1);
    });

    it('should cancel debit instruction', async () => {
      const response = await paymentsService.cancelDebitInstruction({
        mandateId,
        requestId: debitInstructionRequestId,
        transactionRef: transactionRef.toString(),
      });
      expect(response.mandateId).toBeDefined();
      expect(response.requestId).toBeDefined();
    });

    it('should stop a mandate', async () => {
      const response = await paymentsService.stopMandate({
        mandateId,
        requestId: mandateRequestId,
      });
      expect(response.mandateId).toBeDefined();
    });
  });
});

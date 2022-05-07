import { initializeRemita, InvoiceService } from '../src';
import * as faker from 'faker';

jest.setTimeout(10000);

let invoiceService: InvoiceService;

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

describe('Invoice Tests', () => {
  beforeAll(async () => {
    await initializeRemita({
      environment: 'dev',
    });

    invoiceService = new InvoiceService();
  });

  it('should create a standard invoice', async () => {
    const response = await invoiceService.create({
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
    const response = await invoiceService.create({
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
    const response = await invoiceService.create({
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
    const response = await invoiceService.create({
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
    const response = await invoiceService.status({
      type: 'rrr',
      value: standardRRR,
    });

    expect(response.amount).toBeDefined();
  });

  it('should fetch split payment invoice status by RRR', async () => {
    const response = await invoiceService.status({
      type: 'rrr',
      value: splitPaymentRRR,
    });

    expect(response.amount).toBeDefined();
  });

  it('should fetch custom fields invoice status by RRR', async () => {
    const response = await invoiceService.status({
      type: 'rrr',
      value: customFieldsRRR,
    });

    expect(response.amount).toBeDefined();
  });

  it('should fetch split payment with custom fields invoice status by RRR', async () => {
    const response = await invoiceService.status({
      type: 'rrr',
      value: customFieldsSplitPaymentRRR,
    });

    expect(response.amount).toBeDefined();
  });

  it('should fetch standard invoice status by orderId', async () => {
    const response = await invoiceService.status({
      type: 'orderId',
      value: standardOrderId,
    });

    expect(response.amount).toBeDefined();
  });

  it('should fetch split payment invoice status by orderId', async () => {
    const response = await invoiceService.status({
      type: 'orderId',
      value: splitPaymentOrderId,
    });

    expect(response.amount).toBeDefined();
  });

  it('should fetch custom fields invoice status by orderId', async () => {
    const response = await invoiceService.status({
      type: 'orderId',
      value: customFieldsOrderId,
    });

    expect(response.amount).toBeDefined();
  });

  it('should fetch split payment with custom fields invoice status by orderId', async () => {
    const response = await invoiceService.status({
      type: 'orderId',
      value: customFieldsSplitPaymentOrderId,
    });

    expect(response.amount).toBeDefined();
  });

  it('should cancel standard invoice', async () => {
    const response = await invoiceService.cancel(standardRRR);

    expect(response.status).toBeDefined();
  });

  it('should cancel split payment invoice', async () => {
    const response = await invoiceService.cancel(splitPaymentRRR);

    expect(response.status).toBeDefined();
  });

  it('should cancel custom fields invoice', async () => {
    const response = await invoiceService.cancel(customFieldsRRR);

    expect(response.status).toBeDefined();
  });

  it('should cancel split payment with custom fields invoice', async () => {
    const response = await invoiceService.cancel(customFieldsSplitPaymentRRR);

    expect(response.status).toBeDefined();
  });
});

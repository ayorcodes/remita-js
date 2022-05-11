import { AppModuleKeys } from '../../constants/module.keys';
import { BaseService } from '../../shared/base-service';
import { Helper } from '../../shared/helpers';
import {
  IValidateCustomer,
  IInitiateTransaction,
  ICreateBillPaymentNotification,
} from './billers.dto';
import {
  IFetchBillersResponse,
  IFetchBillCategoriesResponse,
  IFetchBillersByCategoryResponse,
  IFetchBillerProductsResponse,
  IValidateCustomerResponse,
  IInitiateTransactionResponse,
  ICreateBillPaymentNotificationResponse,
  ILookupTransactionResponse,
  IQueryTransactionResponse,
} from './billers.responses';

const key = AppModuleKeys.BILLER_AGGREGATION_MODULE;

export class BillerAggregationService extends BaseService {
  constructor() {
    super(key);
  }

  async getBillers(): Promise<IFetchBillersResponse[]> {
    const { authHeader } = this.process();

    const response = await this.request().get(
      'bgatesvc/v3/billpayment/billers',
      {
        headers: authHeader,
      }
    );

    return Helper.handleResponse(response, key, false, true);
  }

  async getBillCategories(): Promise<IFetchBillCategoriesResponse[]> {
    const { authHeader } = this.process();

    const response = await this.request().get(
      'bgatesvc/v3/billpayment/categories',
      {
        headers: authHeader,
      }
    );

    return Helper.handleResponse(response, key, false, true);
  }

  async getBillersByCategory(
    categoryId: string
  ): Promise<IFetchBillersByCategoryResponse[]> {
    const { authHeader } = this.process();

    const response = await this.request().get(
      `bgatesvc/v3/billpayment/category/${categoryId}`,
      {
        headers: authHeader,
      }
    );

    return Helper.handleResponse(response, key, false, true);
  }

  async getBillerProducts(
    billerId: string
  ): Promise<IFetchBillerProductsResponse> {
    const { authHeader } = this.process();

    const response = await this.request().get(
      `bgatesvc/v3/billpayment/biller/${billerId}/products`,
      {
        headers: authHeader,
      }
    );

    return Helper.handleResponse(response, key);
  }

  async validateCustomer(
    dto: IValidateCustomer
  ): Promise<IValidateCustomerResponse> {
    const { authHeader } = this.process(null, dto);

    const response = await this.request().post(
      `bgatesvc/v3/billpayment/biller/customer/validation`,
      dto,
      {
        headers: authHeader,
      }
    );

    return Helper.handleResponse(response, key);
  }

  async initiateBillPayment(
    dto: IInitiateTransaction
  ): Promise<IInitiateTransactionResponse> {
    const { authHeader } = this.process(null, dto);

    const response = await this.request().post(
      `bgatesvc/v3/billpayment/biller/transaction/initiate`,
      dto,
      {
        headers: authHeader,
      }
    );

    return Helper.handleResponse(response, key, false);
  }

  async createBillPaymentNotification(
    dto: ICreateBillPaymentNotification
  ): Promise<ICreateBillPaymentNotificationResponse> {
    const { authHeader } = this.process(null, dto);

    const response = await this.request().post(
      `bgatesvc/v3/billpayment/biller/transaction/paymentnotification`,
      dto,
      {
        headers: authHeader,
      }
    );

    return Helper.handleResponse(response, key, false);
  }

  async getBillPayment(rrr: string): Promise<ILookupTransactionResponse> {
    const { authHeader } = this.process();

    const response = await this.request().get(
      `bgatesvc/v3/billpayment/biller/transaction/lookup/${rrr}`,
      {
        headers: authHeader,
      }
    );

    return Helper.handleResponse(response, key);
  }

  async queryTransaction(
    billPaymenttransactionRef: string
  ): Promise<IQueryTransactionResponse> {
    const { authHeader } = this.process();

    const response = await this.request().get(
      `bgatesvc/v3/billpayment/biller/transaction/query/${billPaymenttransactionRef}`,
      {
        headers: authHeader,
      }
    );

    return Helper.handleResponse(response, key);
  }

  async getPaymentStatus(transactionId: string) {
    const { authHeader } = this.process();

    const response = await this.request().get(
      `bgatesvc/billing/payment/status/${transactionId}`,
      {
        headers: authHeader,
      }
    );

    return Helper.handleResponse(response, key);
  }

  async getPaymentReceipt(rrr: string) {
    const { publicKey, requestId } = this.process();

    const response = await this.request('apiv2').get(
      `billing/receipt/${publicKey}/${rrr}/${requestId}/rest.reg`
    );

    return Helper.handleResponse(response, key);
  }
}

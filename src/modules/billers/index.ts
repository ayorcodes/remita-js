import { RemitaOperations } from '../../constants/operations';
import { BaseService } from '../../shared/base-service';
import { Helper } from '../../shared/helpers';
import {
  ICreateBillPaymentNotification,
  IInitiateTransaction,
  ISendPaymentNotification,
  IValidateCustomer,
  IValidateRequest,
} from './billers.dto';
import {
  ICreateBillPaymentNotificationResponse,
  IFetchBillCategoriesResponse,
  IFetchBillerProductsResponse,
  IFetchBillersByCategoryResponse,
  IFetchBillersResponse,
  IFetchServicesResponse,
  IInitiateTransactionResponse,
  ILookupTransactionResponse,
  IQueryTransactionResponse,
  IValidateCustomerResponse,
} from './billers.responses';

const key = 'biller';

export class BillerService extends BaseService {
  constructor() {
    super(key);
  }

  async fetchBillers(): Promise<IFetchBillersResponse[]> {
    const { authHeader } = this.process();

    const response = await this.request().get(
      'bgatesvc/v3/billpayment/billers',
      {
        headers: authHeader,
      }
    );

    return Helper.handleResponse(response, key, false, true);
  }

  async fetchBillCategories(): Promise<IFetchBillCategoriesResponse[]> {
    const { authHeader } = this.process();

    const response = await this.request().get(
      'bgatesvc/v3/billpayment/categories',
      {
        headers: authHeader,
      }
    );

    return Helper.handleResponse(response, key, false, true);
  }

  async fetchBillersByCategory(
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

  async fetchBillerProducts(
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

  async initiateTransaction(
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

  async createPaymentNotification(
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

  async lookupTransaction(rrr: string): Promise<ILookupTransactionResponse> {
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

  async sendPaymentNotification(dto: ISendPaymentNotification) {
    const { authHeader, publicKeyHeader, hash } = this.process(
      RemitaOperations.billers.payment_notification,
      dto
    );

    const response = await this.request().post(
      `bgatesvc/billing/payment/notify`,
      { ...dto, hash },
      {
        // headers: { ...authHeader, ...publicKeyHeader },
        headers: authHeader,
      }
    );

    return Helper.handleResponse(response, key);
  }

  async fetchPaymentStatus(transactionId: string) {
    const { authHeader } = this.process();

    const response = await this.request().get(
      `bgatesvc/billing/payment/status/${transactionId}`,
      {
        headers: authHeader,
      }
    );

    return Helper.handleResponse(response, key);
  }

  async fetchPaymentReceipt(rrr: string) {
    const { publicKey, requestId } = this.process();

    const response = await this.request('apiv2').get(
      `billing/receipt/${publicKey}/${rrr}/${requestId}/rest.reg`
    );

    return Helper.handleResponse(response, key);
  }
}

// async fetchServices(billerId: string): Promise<IFetchServicesResponse> {
//   const { authHeader } = this.process();

//   const response = await this.request().get(
//     `bgatesvc/billing/${billerId}/servicetypes`,
//     {
//       headers: authHeader,
//     }
//   );

//   return Helper.handleResponse(response, key).responseData;
// }

// async fetchCustomFields(serviceTypeId: string) {
//   const { authHeader } = this.process();

//   const response = await this.request().get(
//     `bgatesvc/billing/servicetypes/${serviceTypeId}`,
//     {
//       headers: authHeader,
//     }
//   );

//   return Helper.handleResponse(response, key);
// }

// async validateRequest(dto: IValidateRequest) {
//   const { authHeader } = this.process(null, dto);

//   const response = await this.request().post(
//     `bgatesvc/billing/validate`,
//     { ...dto, billId: dto.serviceTypeId },
//     {
//       headers: authHeader,
//     }
//   );

//   return Helper.handleResponse(response, key);
// }

// async generateRRR(dto: IValidateRequest) {
//   const { authHeader } = this.process(null, dto);

//   const response = await this.request().post(
//     `bgatesvc/billing/generate`,
//     { ...dto, billId: dto.serviceTypeId },
//     {
//       headers: authHeader,
//     }
//   );

//   return Helper.handleResponse(response, key);
// }

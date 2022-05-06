import { RemitaOperations } from '../../constants/operations';
import { BaseService } from '../../shared/base-service';
import { Helper } from '../../shared/helpers';
import { ISendPaymentNotification, IValidateRequest } from './billers.dto';
import {
  IFetchBillersResponse,
  IFetchServicesResponse,
} from './billers.responses';

const key = 'biller';

export class BillerService extends BaseService {
  constructor() {
    super(key);
  }

  async fetchBillers(): Promise<IFetchBillersResponse> {
    const { publicKeyHeader } = this.process();

    const response = await this.request().get('bgatesvc/billing/billers', {
      headers: publicKeyHeader,
    });

    return Helper.handleResponse(response, key).responseData;
  }

  async fetchServices(billerId: string): Promise<IFetchServicesResponse> {
    const { publicKeyHeader } = this.process();

    const response = await this.request().get(
      `bgatesvc/billing/${billerId}/servicetypes`,
      {
        headers: publicKeyHeader,
      }
    );

    return Helper.handleResponse(response, key).responseData;
  }

  async fetchCustomFields(serviceTypeId: string) {
    const { publicKeyHeader } = this.process();

    const response = await this.request().get(
      `bgatesvc/billing/servicetypes/${serviceTypeId}`,
      {
        headers: publicKeyHeader,
      }
    );

    return Helper.handleResponse(response, key);
  }

  async validateRequest(dto: IValidateRequest) {
    const { publicKeyHeader } = this.process(null, dto);

    const response = await this.request().post(
      `bgatesvc/billing/validate`,
      { ...dto, billId: dto.serviceTypeId },
      {
        headers: publicKeyHeader,
      }
    );

    return Helper.handleResponse(response, key);
  }

  async generateRRR(dto: IValidateRequest) {
    const { publicKeyHeader } = this.process(null, dto);

    const response = await this.request().post(
      `bgatesvc/billing/generate`,
      { ...dto, billId: dto.serviceTypeId },
      {
        headers: publicKeyHeader,
      }
    );

    return Helper.handleResponse(response, key);
  }

  async fetchRRRDetails(rrr: string) {
    const { publicKeyHeader } = this.process();

    const response = await this.request().get(
      `bgatesvc/billing/lookup/${rrr}`,
      {
        headers: publicKeyHeader,
      }
    );

    return Helper.handleResponse(response, key);
  }

  async sendPaymentNotification(dto: ISendPaymentNotification) {
    const { billerHeader, hash } = this.process(
      RemitaOperations.billers.payment_notification,
      dto
    );

    const response = await this.request().post(
      `bgatesvc/billing/payment/notify`,
      { ...dto, hash },
      {
        headers: billerHeader,
      }
    );

    return Helper.handleResponse(response, key);
  }

  async fetchPaymentStatus(transactionId: string) {
    const { publicKeyHeader } = this.process();

    const response = await this.request().get(
      `bgatesvc/billing/payment/status/${transactionId}`,
      {
        headers: publicKeyHeader,
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

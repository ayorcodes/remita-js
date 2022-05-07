import { RemitaOperations } from '../../constants/operations';
import { BaseService } from '../../shared/base-service';
import { Helper } from '../../shared/helpers';
import {
  IAccountLookupResponse,
  ICreateBulkPaymentResponse,
  ICreateSinglePaymentResponse,
  IFetchActiveBanksResponse,
  IFetchBulkPaymentResponse,
  IFetchSinglePaymentResponse,
} from './payment.responses';
import {
  IAccountLookup,
  ICreateBulkPayment,
  ICreateSinglePayment,
  IFetchBulkPayment,
  IFetchSinglePayment,
} from './payments.dto';

let key = 'payment';

export class PaymentService extends BaseService {
  constructor() {
    super(key);
  }

  async accountLookup(dto: IAccountLookup): Promise<IAccountLookupResponse> {
    const { authHeader } = this.process(
      RemitaOperations.payments.account_lookup,
      dto
    );

    const response = await this.request().post(
      'rpgsvc/v3/rpg/account/lookup',
      dto,
      {
        headers: authHeader,
      }
    );

    return Helper.handleResponse(response);
  }

  async createSingle(
    dto: ICreateSinglePayment
  ): Promise<ICreateSinglePaymentResponse> {
    try {
      const { authHeader } = this.process(null, dto);

      const response = await this.request().post(
        'rpgsvc/v3/rpg/single/payment',
        dto,
        {
          headers: authHeader,
        }
      );

      return Helper.handleResponse(response);
    } catch (error) {
      Helper.handleServerError(error);
      return null;
    }
  }

  async createBulk(
    dto: ICreateBulkPayment
  ): Promise<ICreateBulkPaymentResponse> {
    try {
      const { authHeader } = this.process(null, dto);

      const response = await this.request().post(
        'rpgsvc/v3/rpg/bulk/payment',
        dto,
        {
          headers: authHeader,
        }
      );

      return Helper.handleResponse(response);
    } catch (error) {
      Helper.handleServerError(error);
      return null;
    }
  }

  async fetchSinglePaymentStatus(
    // dto: IFetchSinglePayment
    transRef: string
  ): Promise<IFetchSinglePaymentResponse> {
    try {
      const { authHeader } = this.process(null, { transRef });

      const response = await this.request().get(
        `rpgsvc/v3/rpg/single/payment/status/${transRef}`,
        {
          // data: dto,
          headers: authHeader,
        }
      );

      return Helper.handleResponse(response);
    } catch (error) {
      Helper.handleServerError(error);
      return null;
    }
  }

  async fetchBulkPaymentStatus(
    // dto: IFetchBulkPayment
    batchRef: string
  ): Promise<IFetchBulkPaymentResponse> {
    try {
      const { authHeader } = this.process(null, { batchRef });

      const response = await this.request().get(
        `rpgsvc/v3/rpg/bulk/payment/status/${batchRef}`,
        {
          // data: dto,
          headers: authHeader,
        }
      );

      return Helper.handleResponse(response);
    } catch (error) {
      Helper.handleServerError(error);
      return null;
    }
  }

  async fetchActiveBanks(): Promise<IFetchActiveBanksResponse> {
    try {
      const { headers } = this.process(
        RemitaOperations.payments.get_active_banks,
        {}
      );

      const response = await this.request().post(
        'rpgsvc/rpg/api/v2/fi/banks',
        null,
        {
          headers,
        }
      );

      return Helper.handleResponse(response);
    } catch (error) {
      Helper.handleServerError(error);
      return null;
    }
  }
}

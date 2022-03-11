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

  async create(
    dto: ICreateSinglePayment | ICreateBulkPayment
  ): Promise<ICreateSinglePaymentResponse | ICreateBulkPaymentResponse> {
    try {
      const { authHeader } = this.process(null, dto);

      const response = await this.request().post(
        dto.type == 'single'
          ? 'rpgsvc/v3/rpg/single/payment'
          : 'rpgsvc/v3/rpg/bulk/payment',
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

  async fetchStatus(
    dto: IFetchSinglePayment | IFetchBulkPayment
  ): Promise<IFetchSinglePaymentResponse | IFetchBulkPaymentResponse> {
    try {
      const { authHeader } = this.process(null, dto);

      const response = await this.request().get(
        dto.type == 'single'
          ? 'rpgsvc/v3/rpg/single/payment/status/'
          : 'rpgsvc/v3/rpg/bulk/payment/status/',
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

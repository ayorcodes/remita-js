import { AppModuleKeys } from '../../constants/module.keys';
import { RemitaOperations } from '../../constants/operations';
import { BaseService } from '../../shared/base-service';
import { Helper } from '../../shared/helpers';
import {
  IAccountLookup,
  ICreateBulkPayment,
  ICreateSinglePayment,
} from './funds-transfer.dto';
import {
  IAccountLookupResponse,
  ICreateBulkPaymentResponse,
  ICreateSinglePaymentResponse,
  IFetchActiveBanksResponse,
  IFetchBulkPaymentResponse,
  IFetchSinglePaymentResponse,
} from './funds-transfer.response';

const key = AppModuleKeys.FUNDS_TRANSFER_MODULE;
export class FundsTransferService extends BaseService {
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

    return Helper.handleResponse(response, key);
  }

  async createSinglePayment(
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

      return Helper.handleResponse(response, key);
    } catch (error) {
      Helper.handleServerError(error);
      return null;
    }
  }

  async getSinglePaymentTransactionStatus(
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

      return Helper.handleResponse(response, key);
    } catch (error) {
      Helper.handleServerError(error);
      return null;
    }
  }

  async createBulkPayment(
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

      return Helper.handleResponse(response, key);
    } catch (error) {
      Helper.handleServerError(error);
      return null;
    }
  }

  async getBulkPaymentTransactionStatus(
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

      return Helper.handleResponse(response, key);
    } catch (error) {
      Helper.handleServerError(error);
      return null;
    }
  }

  async getActiveBanks(): Promise<IFetchActiveBanksResponse> {
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

      return Helper.handleResponse(response, key);
    } catch (error) {
      Helper.handleServerError(error);
      return null;
    }
  }
}

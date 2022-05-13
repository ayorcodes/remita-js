import { AppModuleKeys } from '../../constants/module.keys';
import { RemitaOperations } from '../../constants/operations';
import { BaseService } from '../../shared/base-service';
import { Helper } from '../../shared/helpers';
import {
  IAccountLookup,
  ICreateBulkPayment,
  ICreateSinglePayment,
  IFetchBulkPayment,
  IFetchSinglePayment,
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

  async createPayment(
    dto: ICreateSinglePayment
  ): Promise<ICreateSinglePaymentResponse>;

  async createPayment(
    dto: ICreateBulkPayment
  ): Promise<ICreateBulkPaymentResponse>;

  async createPayment(
    dto: ICreateSinglePayment | ICreateBulkPayment
  ): Promise<ICreateSinglePaymentResponse | ICreateBulkPaymentResponse> {
    try {
      const { authHeader } = this.process(null, dto);

      const response = await this.request().post(
        dto.type == 'single'
          ? 'rpgsvc/v3/rpg/single/payment'
          : 'rpgsvc/v3/rpg/bulk/payment',
        dto.type == 'single'
          ? { transactionRef: Math.floor(Math.random() * 1101233), ...dto }
          : { batchRef: Math.floor(Math.random() * 1101233), ...dto },
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

  async getPaymentStatus(
    dto: IFetchSinglePayment
  ): Promise<IFetchSinglePaymentResponse>;

  async getPaymentStatus(
    dto: IFetchBulkPayment
  ): Promise<IFetchBulkPaymentResponse>;

  async getPaymentStatus(
    dto: IFetchSinglePayment | IFetchBulkPayment
  ): Promise<IFetchSinglePaymentResponse | IFetchBulkPaymentResponse> {
    const { type } = dto;
    try {
      const { authHeader } = this.process(
        null,
        type == 'single'
          ? { transRef: dto.transRef }
          : { batchRef: dto.batchRef }
      );

      const response = await this.request().get(
        type == 'single'
          ? `rpgsvc/v3/rpg/single/payment/status/${dto.transRef}`
          : `rpgsvc/v3/rpg/bulk/payment/status/${dto.batchRef}`,
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

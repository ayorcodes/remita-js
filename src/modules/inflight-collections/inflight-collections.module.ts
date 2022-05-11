import { AppModuleKeys } from '../../constants/module.keys';
import { RemitaOperations } from '../../constants/operations';
import { BaseService } from '../../shared/base-service';
import { Helper } from '../../shared/helpers';
import {
  ICreateLoanDisbursementNotification,
  IFetchLoanRepaymentHistory,
  IStopLoanCollection,
} from './inflight-collections.dto';
import {
  ICreateLoanDisbursementNotificationResponse,
  IFetchLoanRepaymentHistoryResponse,
  IStopLoanCollectionResponse,
} from './inflight-collections.response';

const key = AppModuleKeys.INFLIGHT_COLLECTIONS_MODULE;

export class InflightCollectionsService extends BaseService {
  constructor() {
    super(key);
  }
  async loanDisbursementNotification(
    dto: ICreateLoanDisbursementNotification
  ): Promise<ICreateLoanDisbursementNotificationResponse> {
    const { lenderHeader } = this.process(
      RemitaOperations.lender.fetch_salary_history,
      dto
    );

    const response = await this.request().post(
      `loansvc/data/api/v2/payday/post/loan`,
      dto,
      {
        headers: lenderHeader,
      }
    );

    return Helper.handleResponse(response, key);
  }

  async getLoanRepaymentHistory(
    dto: IFetchLoanRepaymentHistory
  ): Promise<IFetchLoanRepaymentHistoryResponse> {
    const { lenderHeader } = this.process(
      RemitaOperations.lender.fetch_salary_history,
      dto
    );

    const response = await this.request().post(
      `loansvc/data/api/v2/payday/loan/payment/history`,
      dto,
      {
        headers: lenderHeader,
      }
    );

    return Helper.handleResponse(response, key);
  }

  async stopLoanCollection(
    dto: IStopLoanCollection
  ): Promise<IStopLoanCollectionResponse> {
    const { lenderHeader } = this.process(
      RemitaOperations.lender.fetch_salary_history,
      dto
    );

    const response = await this.request().post(
      `loansvc/data/api/v2/payday/stop/loan`,
      dto,
      {
        headers: lenderHeader,
      }
    );

    return Helper.handleResponse(response, key);
  }
}

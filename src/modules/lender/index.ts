import { RemitaOperations } from '../../constants/operations';
import { BaseService } from '../../shared/base-service';
import { Helper } from '../../shared/helpers';
import {
  ICreateLoanDisbursementNotification,
  IFetchLoanRepaymentHistory,
  IFetchSalaryHistory,
  IFetchUserByNIN,
  IStopLoanCollection,
} from './lender.dto';
import {
  ICreateLoanDisbursementNotificationResponse,
  IFetchLoanRepaymentHistoryResponse,
  IFetchSalaryHistoryResponse,
  IFetchUserByNINResponse,
  IStopLoanCollectionResponse,
} from './lender.responses';

let key = 'lender';

export class LenderService extends BaseService {
  constructor() {
    super(key);
  }

  async fetchSalaryHistory(
    dto: IFetchSalaryHistory
  ): Promise<IFetchSalaryHistoryResponse> {
    const { lenderHeader } = this.process(
      RemitaOperations.lender.fetch_salary_history,
      dto
    );

    const response = await this.request().post(
      `loansvc/data/api/v2/payday/salary/history/provideCustomerDetails`,
      dto,
      { headers: lenderHeader }
    );

    return Helper.handleResponse(response, key, false);
  }

  // async fetchRefServices() {
  //   const { lenderHeader } = this.process(null);

  //   const response = await this.request().get(`availablereferencedata`, {
  //     headers: lenderHeader,
  //   });

  //   return Helper.handleResponse(response, key);
  // }

  // async fetchRefServiceById(refId: string) {
  //   const { lenderHeader } = this.process(null);

  //   const response = await this.request().get(
  //     `reference-data-configs/${refId}`,
  //     {
  //       headers: lenderHeader,
  //     }
  //   );

  //   return Helper.handleResponse(response, key);
  // }

  async fetchUserByNIN(dto: IFetchUserByNIN): Promise<IFetchUserByNINResponse> {
    // try {
    const { lenderHeader, authHeader } = this.process(null, dto);

    const response = await this.request().post(`ext/referencedata/nin`, dto, {
      // const response = await this.request().post(`referencedata`, dto, {
      headers: lenderHeader,
    });

    return Helper.handleResponse(response, key);
    // } catch (error) {
    //   console.log({ error });
    // }
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

  async fetchLoanRepaymentHistory(
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

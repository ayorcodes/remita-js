import { AppModuleKeys } from '../../constants/module.keys';
import { RemitaOperations } from '../../constants/operations';
import { BaseService } from '../../shared/base-service';
import { Helper } from '../../shared/helpers';
import {
  IFetchSalaryHistoryByAccountNumber,
  IFetchSalaryHistoryByPhoneNumber,
  IFetchUserByNIN,
} from './reference-data.dto';
import {
  IFetchSalaryHistoryResponse,
  IFetchUserByNINResponse,
} from './reference-data.response';

const key = AppModuleKeys.REFERENCE_DATA_MODULE;

export class ReferenceDataService extends BaseService {
  constructor() {
    super(key);
  }

  async getSalaryHistory(
    dto: IFetchSalaryHistoryByAccountNumber | IFetchSalaryHistoryByPhoneNumber
  ): Promise<IFetchSalaryHistoryResponse> {
    const { lenderHeader } = this.process(
      RemitaOperations.lender.fetch_salary_history,
      dto
    );

    const response = await this.request().post(
      `loansvc/data/api/v2/payday/salary/history/ph`,
      dto,
      { headers: lenderHeader }
    );

    return Helper.handleResponse(response, key, false);
  }

  async getUserInfoByNIN(
    dto: IFetchUserByNIN
  ): Promise<IFetchUserByNINResponse> {
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
}

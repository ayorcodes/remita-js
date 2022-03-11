import { BaseService } from '../../shared/base-service';
import { Helper } from '../../shared/helpers';
import { IFetchSalaryHistory, IFetchUserByNIN } from './lender.dto';

let key = 'lender';

export class LenderService extends BaseService {
  constructor() {
    super(key);
  }

  async fetchSalaryHistory(dto: IFetchSalaryHistory) {
    const { lenderHeader } = this.process(null, dto);

    const response = await this.request().post(
      `loansvc/data/api/v2/payday/salary/history/provideCustomerDetails`,
      dto,
      { headers: lenderHeader }
    );

    return Helper.handleResponse(response, key);
  }

  async fetchRefServices() {
    const { lenderHeader } = this.process(null);

    const response = await this.request().get(`availablereferencedata`, {
      headers: lenderHeader,
    });

    return Helper.handleResponse(response, key);
  }

  async fetchRefServiceById(refId: string) {
    const { lenderHeader } = this.process(null);

    const response = await this.request().get(
      `reference-data-configs/${refId}`,
      {
        headers: lenderHeader,
      }
    );

    return Helper.handleResponse(response, key);
  }

  async fetchUserByNIN(dto: IFetchUserByNIN) {
    const { lenderHeader } = this.process(null, dto);

    const response = await this.request().post(`referencedata`, dto, {
      headers: lenderHeader,
    });

    return Helper.handleResponse(response, key);
  }
}

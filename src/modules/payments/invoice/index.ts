import { AppModuleKeys } from '../../../constants/module.keys';
import { RemitaOperations } from '../../../constants/operations';
import { IBaseResponse } from '../../../shared/base-response';
import { BaseService } from '../../../shared/base-service';
import { Helper } from '../../../shared/helpers';
import {
  ICreateInvoiceResponse,
  InvoiceStatusResponse,
} from './invoice.responses';
import {
  ICreateCustomFieldsInvoice,
  ICreateCustomFieldsSplitPaymentInvoice,
  ICreateInvoice,
  ICreateSplitPaymentInvoice,
  InvoiceStatusOrderId,
  InvoiceStatusRRR,
} from './invoices.dto';

const key = AppModuleKeys.PAYMENTS_MODULE;

export class InvoiceService extends BaseService {
  constructor() {
    super(key);
  }

  async create(
    dto:
      | ICreateInvoice
      | ICreateSplitPaymentInvoice
      | ICreateCustomFieldsInvoice
      | ICreateCustomFieldsSplitPaymentInvoice
  ): Promise<ICreateInvoiceResponse> {
    const { serviceTypeId, invoiceHeaders, hash } = this.process(
      RemitaOperations.invoice.create,
      dto
    );

    const response = await this.request().post(
      'echannelsvc/merchant/api/paymentinit',
      {
        ...dto,
        serviceTypeId,
      },
      { headers: invoiceHeaders }
    );

    response.data.hash = hash;

    return Helper.handleResponse(response, AppModuleKeys.PAYMENTS_MODULE);
  }

  async cancel(rrr: string): Promise<IBaseResponse> {
    const { hash, merchantId } = this.process(RemitaOperations.invoice.cancel, {
      rrr,
    });

    const response = await this.request().post(
      'echannelsvc/v2/api/deactivate.json',
      {
        rrr,
        hash,
        merchantId,
      }
    );

    return Helper.handleResponse(response, AppModuleKeys.PAYMENTS_MODULE);
  }

  async status(
    dto: InvoiceStatusRRR | InvoiceStatusOrderId
  ): Promise<InvoiceStatusResponse> {
    const { merchantId, invoiceHeaders, requestId, apiKey, hash } =
      this.process(RemitaOperations.invoice.status, dto);

    const response = await this.request().get(
      dto.type == 'rrr'
        ? `echannelsvc/${merchantId}/${dto.value}/${hash}/status.reg`
        : `echannelsvc/${merchantId}/${dto.value}/${hash}/orderstatus.reg`,
      {
        headers: invoiceHeaders,
      }
    );

    return Helper.handleResponse(response, AppModuleKeys.PAYMENTS_MODULE);
  }
}

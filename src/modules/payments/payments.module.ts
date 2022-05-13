import { AppModuleKeys } from '../../constants/module.keys';
import { IBaseResponse } from '../../shared/base-response';
import { BaseService } from '../../shared/base-service';
import { DirectDebitService } from './direct-debit';
import {
  ICancelDebitInstruction,
  ICreateDebitInstruction,
  ICreateMandate,
  IFetchMandateStatus,
  IGetDebitInstructionStatus,
  IMandatePaymentHistory,
  IRequestMandateOTP,
  IStopMandate,
  IValidateMandateOTP,
} from './direct-debit/direct-debit.dto';
import {
  ICancelDebitInstructionResponse,
  ICreateMandateResponse,
  IFetchDebitStatusResponse,
  IFetchMandatePaymentHistoryResponse,
  IFetchMandateStatusResponse,
  IRequestMandateOTPResponse,
  ISendDebitInstructionResponse,
  IStopMandateResponse,
  IValidateMandateOTPResponse,
} from './direct-debit/direct-debit.responses';
import { InvoiceService } from './invoice';
import {
  ICreateInvoiceResponse,
  InvoiceStatusResponse,
} from './invoice/invoice.responses';
import {
  ICreateInvoice,
  ICreateSplitPaymentInvoice,
  ICreateCustomFieldsInvoice,
  ICreateCustomFieldsSplitPaymentInvoice,
  InvoiceStatusRRR,
  InvoiceStatusOrderId,
} from './invoice/invoices.dto';

// const key = AppModuleKeys.PAYMENTS_MODULE;

let is: InvoiceService;
let dds: DirectDebitService;

export class PaymentsService {
  constructor() {
    is = new InvoiceService();
    dds = new DirectDebitService();
  }

  createInvoice(
    dto:
      | ICreateInvoice
      | ICreateSplitPaymentInvoice
      | ICreateCustomFieldsInvoice
      | ICreateCustomFieldsSplitPaymentInvoice
  ): Promise<ICreateInvoiceResponse> {
    return is.create(dto);
  }

  cancelInvoice(rrr: string): Promise<IBaseResponse> {
    return is.cancel(rrr);
  }

  getInvoiceStatus(
    dto: InvoiceStatusRRR | InvoiceStatusOrderId
  ): Promise<InvoiceStatusResponse> {
    return is.status(dto);
  }

  createMandate(dto: ICreateMandate): Promise<ICreateMandateResponse> {
    return dds.createMandate(dto);
  }

  getMandateOTP(dto: IRequestMandateOTP): Promise<IRequestMandateOTPResponse> {
    return dds.requestMandateOTP(dto);
  }

  validateMandateOTP(
    dto: IValidateMandateOTP
  ): Promise<IValidateMandateOTPResponse> {
    return dds.validateMandateOTP(dto);
  }

  getMandateStatus(
    dto: IFetchMandateStatus
  ): Promise<IFetchMandateStatusResponse> {
    return dds.fetchMandateStatus(dto);
  }

  getMandatePaymentHistory(
    dto: IMandatePaymentHistory
  ): Promise<IFetchMandatePaymentHistoryResponse> {
    return dds.mandatePaymentHistory(dto);
  }

  stopMandate(dto: IStopMandate): Promise<IStopMandateResponse> {
    return dds.stopMandate(dto);
  }

  sendDebitInstruction(
    dto: ICreateDebitInstruction
  ): Promise<ISendDebitInstructionResponse> {
    return dds.sendDebitInstruction(dto);
  }

  getDebitInstructionStatus(
    dto: IGetDebitInstructionStatus
  ): Promise<IFetchDebitStatusResponse> {
    return dds.fetchDebitStatus(dto);
  }

  cancelDebitInstruction(
    dto: ICancelDebitInstruction
  ): Promise<ICancelDebitInstructionResponse> {
    return dds.cancelDebitInstruction(dto);
  }
}

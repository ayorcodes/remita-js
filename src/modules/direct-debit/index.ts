import { RemitaOperations } from '../../constants/operations';
import { BaseService } from '../../shared/base-service';
import { Helper } from '../../shared/helpers';

import {
  ICreateMandate,
  IFetchMandateStatus,
  IMandatePaymentHistory,
  IRequestMandateOTP,
  IStopMandate,
  IValidateMandateOTP,
  ICancelDebitInstruction,
  ICreateDebitInstruction,
  IGetDebitInstructionStatus,
} from './direct-debit.dto';
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
} from './direct-debit.responses';

// export const mandateStatus = () => {};

let key = 'directDebit';

export class DirectDebitService extends BaseService {
  constructor() {
    super(key);
  }

  createMandate = async (
    dto: ICreateMandate
  ): Promise<ICreateMandateResponse> => {
    const { hash, requestId, merchantId, serviceTypeId } = this.process(
      RemitaOperations.mandate.create,
      dto
    );

    const response = await this.request().post(
      'echannelsvc/echannel/mandate/setup',
      {
        ...dto,
        hash,
        merchantId,
        serviceTypeId,
        requestId,
      }
    );

    return Helper.handleResponse(response);
  };

  stopMandate = async (dto: IStopMandate): Promise<IStopMandateResponse> => {
    const { hash, requestId, merchantId } = this.process(
      RemitaOperations.mandate.stop,
      dto
    );

    const response = await this.request().post(
      'echannelsvc/echannel/mandate/stop',
      {
        merchantId,
        mandateId: dto.mandateId,
        requestId,
        hash,
      }
    );

    return Helper.handleResponse(response);
  };

  requestMandateOTP = async (
    dto: IRequestMandateOTP
  ): Promise<IRequestMandateOTPResponse> => {
    const { requestId, headers } = this.process(
      RemitaOperations.mandate.request_otp,
      dto
    );

    const response = await this.request().post(
      'echannelsvc/echannel/mandate/requestAuthorization',
      {
        mandateId: dto.mandateId,
        requestId,
      },
      { headers }
    );

    return Helper.handleResponse(response);
  };

  validateMandateOTP = async (
    dto: IValidateMandateOTP
  ): Promise<IValidateMandateOTPResponse> => {
    const { headers } = this.process(
      RemitaOperations.mandate.validate_otp,
      dto
    );

    const response = await this.request().post(
      'echannelsvc/echannel/mandate/validateAuthorization',
      dto,
      {
        headers,
      }
    );

    return Helper.handleResponse(response);
  };

  mandatePaymentHistory = async (
    dto: IMandatePaymentHistory
  ): Promise<IFetchMandatePaymentHistoryResponse> => {
    const { hash, merchantId } = this.process(
      RemitaOperations.mandate.payment_history,
      dto
    );

    const response = await this.request().post(
      'echannelsvc/echannel/mandate/payment/history',
      {
        merchantId,
        hash,
        ...dto,
      }
    );

    const result = Helper.handleResponse(response);
    return {
      ...result.data,
      requestId: result.requestId,
      mandateId: result.mandateId,
      statuscode: result.statuscode,
      status: result.status,
    };
  };

  fetchMandateStatus = async (
    dto: IFetchMandateStatus
  ): Promise<IFetchMandateStatusResponse> => {
    const { merchantId, hash } = this.process(
      RemitaOperations.mandate.payment_history,
      dto
    );

    const response = await this.request().post(
      `echannelsvc/echannel/mandate/status`,
      {
        ...dto,
        merchantId,
        hash,
      }
    );

    return Helper.handleResponse(response);
  };

  sendDebitInstruction = async (
    dto: ICreateDebitInstruction
  ): Promise<ISendDebitInstructionResponse> => {
    const { merchantId, requestId, serviceTypeId, hash } = this.process(
      RemitaOperations.debitInstruction.create,
      dto
    );

    const response = await this.request().post(
      'echannelsvc/echannel/mandate/payment/send',
      {
        merchantId,
        serviceTypeId,
        requestId,
        hash,
        ...dto,
      }
    );

    return Helper.handleResponse(response, 'global', false);
  };

  fetchDebitStatus = async (
    dto: IGetDebitInstructionStatus
  ): Promise<IFetchDebitStatusResponse> => {
    const { merchantId, hash } = this.process(
      RemitaOperations.debitInstruction.status,
      dto
    );

    const response = await this.request().post(
      'echannelsvc/echannel/mandate/payment/status',
      {
        merchantId,
        hash,
        ...dto,
      }
    );

    return Helper.handleResponse(response);
  };

  cancelDebitInstruction = async (
    dto: ICancelDebitInstruction
  ): Promise<ICancelDebitInstructionResponse> => {
    const { merchantId, hash } = this.process(
      RemitaOperations.debitInstruction.cancel,
      dto
    );

    const response = await this.request().post(
      'echannelsvc/echannel/mandate/payment/stop',
      {
        merchantId,
        hash,
        ...dto,
      }
    );

    // console.log(response.data);

    return Helper.handleResponse(response, key);
  };
}

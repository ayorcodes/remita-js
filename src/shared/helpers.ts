import { AxiosResponse } from 'axios';
import { isArray } from 'util';
import { bearerToken } from '../config/configuration';
import { RemitaOperations } from '../constants/operations';
import { statusCodes } from '../constants/statusCodes';

const sha512 = require('js-sha512').sha512;

export class Helper {
  // static getSettings(organization): SettingsDto {
  //   var d = new Date();

  //   const {
  //     settings: { apiKey, serviceTypeId, merchantId, api_token },
  //   } = organization;

  //   return {
  //     apiKey,
  //     serviceTypeId,
  //     merchantId,
  //     requestId: d.getTime(),
  //     api_token,
  //     timeStamp: Helper.timeStamp(d),
  //   };
  // }

  // static process(operation: string, opts) {
  //   const d = new Date();
  //   const { merchantId, serviceTypeId, apiKey, api_token } = configuration;
  //   let { requestId, amount, mandateId, totalAmount, transactionRef } = opts;

  //   if (!requestId) {
  //     requestId = d.getTime();
  //   }

  //   let value: string;

  //   switch (operation) {
  //     case RemitaOperations.mandate.create:
  //       value = `${merchantId}${serviceTypeId}${requestId}${amount}${apiKey}`;
  //       break;
  //     case RemitaOperations.mandate.status:
  //       value = `${mandateId}${merchantId}${requestId}${apiKey}`;
  //       break;
  //     case RemitaOperations.mandate.stop:
  //       value = `${mandateId}${merchantId}${requestId}${apiKey}`;
  //       break;
  //     case RemitaOperations.mandate.request_otp:
  //       value = `${apiKey}${requestId}${api_token}`;
  //       break;
  //     case RemitaOperations.mandate.validate_otp:
  //       value = `${apiKey}${requestId}${api_token}`;
  //       break;
  //     case RemitaOperations.mandate.payment_history:
  //       value = `${mandateId}${merchantId}${requestId}${apiKey}`;
  //       break;
  //     case RemitaOperations.debitInstruction.create:
  //       value = `${merchantId}${serviceTypeId}${requestId}${totalAmount}${apiKey}`;
  //       break;
  //     case RemitaOperations.debitInstruction.status:
  //       value = `${mandateId}${merchantId}${requestId}${apiKey}`;
  //       break;
  //     case RemitaOperations.debitInstruction.cancel:
  //       value = `${transactionRef}${merchantId}${requestId}${apiKey}`;
  //       break;
  //     default:
  //       value = null;
  //       break;
  //   }

  //   const timeStamp = this.timeStamp(d);
  //   const hash = sha512(value);

  //   return {
  //     hash,
  //     remitaConsumerToken: hash,
  //     timeStamp,
  //     requestId,
  //     ...configuration,
  //     headers: {
  //       MERCHANT_ID: merchantId,
  //       API_KEY: apiKey,
  //       REQUEST_ID: requestId,
  //       REQUEST_TS: timeStamp,
  //       API_DETAILS_HASH: hash,
  //     },
  //     invoiceHeaders :{
  //       Authorization: `remitaConsumerKey=${remitaConsumerKey},remitaConsumerToken=`
  //     }
  //   };
  // }

  static timeStamp(d: Date) {
    var hours = d.getUTCHours();
    var minutes = d.getUTCMinutes();
    var seconds = d.getUTCSeconds();
    var dd: any = d.getDate();
    var mm: any = d.getMonth() + 1; //January is 0!
    var yyyy = d.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    return (
      yyyy +
      '-' +
      mm +
      '-' +
      dd +
      'T' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds +
      '+000000'
    );
  }

  static handleResponse(
    response: AxiosResponse,
    type = 'global',
    log: boolean = false,
    mergeArray: boolean = false
  ) {
    if (log) console.log(response.data);
    if (
      type == 'biller' &&
      response.data.status == null &&
      response.data.data == null
    ) {
      throw new Error('No data');
    }
    if (
      response.data.status ||
      response.data.statuscode ||
      response.data.responseCode
    ) {
      // console.log('jsonping the response');
      return jsonp(response.data);
    }

    function jsonp(data) {
      if (log) console.log({ data });

      const { statuscode, status: serverStatus, message, responseCode } = data;
      const status =
        statusCodes[type].find((x) => x.code == Number(statuscode)) ??
        statusCodes[type].find((x) => x.type == serverStatus) ??
        statusCodes[type].find((x) => x.code == serverStatus) ??
        statusCodes[type].find((x) => x.code == Number(responseCode));

      // console.log({ status });

      if (status) {
        if (!status.message) status.message = message;
        if (status.error) throw new Error(status.message);
      }

      let response: any = { ...data };

      if (data.data) {
        if (isArray(data.data) && mergeArray) {
          response = data.data;
        } else {
          response = {
            ...response,
            ...data.data,
          };
        }
      }

      return response;
    }
    return eval(response.data);
  }

  static process(operation: string, opts, config) {
    const d = new Date();

    const {
      merchantId,
      serviceTypeId,
      apiKey,
      api_token,
      publicKey,
      signature,
    } = config;

    let {
      requestId,
      amount,
      mandateId,
      totalAmount,
      transactionRef,
      orderId,
      rrr,
      value,
      amountDebitted,
      fundingSource,
      debittedAccount,
      paymentAuthCode,
      secretKey,
      transactionId,
    } = opts;

    if (!requestId) {
      requestId = d.getTime();
    }

    let preHash: string;

    switch (operation) {
      case RemitaOperations.mandate.create:
        preHash = `${merchantId}${serviceTypeId}${requestId}${amount}${apiKey}`;
        break;
      case RemitaOperations.mandate.status:
        preHash = `${mandateId}${merchantId}${requestId}${apiKey}`;
        break;
      case RemitaOperations.mandate.stop:
        preHash = `${mandateId}${merchantId}${requestId}${apiKey}`;
        break;
      case RemitaOperations.mandate.request_otp:
        preHash = `${apiKey}${requestId}${api_token}`;
        break;
      case RemitaOperations.mandate.validate_otp:
        preHash = `${apiKey}${requestId}${api_token}`;
        break;
      case RemitaOperations.mandate.payment_history:
        preHash = `${mandateId}${merchantId}${requestId}${apiKey}`;
        break;
      case RemitaOperations.debitInstruction.create:
        preHash = `${merchantId}${serviceTypeId}${requestId}${totalAmount}${apiKey}`;
        break;
      case RemitaOperations.debitInstruction.status:
        preHash = `${mandateId}${merchantId}${requestId}${apiKey}`;
        break;
      case RemitaOperations.debitInstruction.cancel:
        preHash = `${transactionRef}${merchantId}${requestId}${apiKey}`;
        break;
      case RemitaOperations.invoice.create:
        preHash = `${merchantId}${serviceTypeId}${orderId}${amount}${apiKey}`;
        break;
      case RemitaOperations.invoice.cancel:
        preHash = `${rrr}${apiKey}${merchantId}`;
        break;
      case RemitaOperations.invoice.status:
        preHash = `${value}${apiKey}${merchantId}`;
        break;
      case RemitaOperations.payments.get_active_banks:
        preHash = `${apiKey}${requestId}${api_token}`;
        break;
      case RemitaOperations.billers.payment_notification:
        preHash = `${rrr}${amountDebitted}${fundingSource}${debittedAccount}${paymentAuthCode}${secretKey}`;
        break;
      case RemitaOperations.lender.fetch_salary_history:
        preHash = `${apiKey}${requestId}${api_token}`;
        break;
      default:
        preHash = '';
        break;
    }

    const timeStamp = this.timeStamp(d);
    const hash = sha512(preHash);

    return {
      hash,
      timeStamp,
      requestId,
      ...config,
      headers: {
        MERCHANT_ID: merchantId,
        API_KEY: apiKey,
        REQUEST_ID: requestId,
        REQUEST_TS: timeStamp,
        API_DETAILS_HASH: hash,
      },
      invoiceHeaders: {
        Authorization: `remitaConsumerKey=${merchantId},remitaConsumerToken=${hash}`,
      },
      authHeader: {
        Authorization: `Bearer ${bearerToken}`,
      },
      publicKeyHeader: {
        publicKey,
      },
      billerHeader: {
        publicKey,
        transactionId,
        TXN_HASH: hash,
      },
      lenderHeader: {
        API_KEY: apiKey,
        API_HASH: hash,
        API_DETAILS_HASH: hash,
        MERCHANT_ID: merchantId,
        REQUEST_ID: requestId,
        AUTHORIZATION: `remitaConsumerKey=${apiKey},remitaConsumerToken=${hash}`,
        // 'X-API-PUBLIC-KEY': publicKey,
        // 'X-API-SIGNATURE': signature,
      },
    };
  }

  private timeStamp(d: Date) {
    var hours = d.getUTCHours();
    var minutes = d.getUTCMinutes();
    var seconds = d.getUTCSeconds();
    var dd: any = d.getDate();
    var mm: any = d.getMonth() + 1; //January is 0!
    var yyyy = d.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    return (
      yyyy +
      '-' +
      mm +
      '-' +
      dd +
      'T' +
      hours +
      ':' +
      minutes +
      ':' +
      seconds +
      '+000000'
    );
  }

  static handleServerError(error) {
    if (!error.response) throw error;
    const data = error.response.data;
    // console.log({ serverError: data });
    if (data.responseData) {
      const rd = JSON.parse(data.responseData);
      throw new Error(rd.message);
    }
  }
}

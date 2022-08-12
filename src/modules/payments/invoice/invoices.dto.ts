import { CustomField } from "../direct-debit/direct-debit.dto";
import { IMakePaymentResponse } from "./invoice.responses";

export interface InvoiceLineItems {
  lineItemsId: string;
  beneficiaryName: string;
  beneficiaryAccount: string;
  bankCode: string;
  beneficiaryAmount: string;
  deductFeeFrom: string;
}

export interface ICreateInvoice {
  type: "standard";
  orderId: string;
  amount: string;
  payerName: string;
  payerEmail: string;
  payerPhone: string;
  description: string;
}

export interface ICreateCustomFieldsInvoice {
  type: "custom_fields";
  orderId: string;
  amount: string;
  payerName: string;
  payerEmail: string;
  payerPhone: string;
  description: string;
  customFields: CustomField[];
}

export interface ICreateCustomFieldsSplitPaymentInvoice {
  type: "custom_fields_split_payment";
  orderId: string;
  amount: string;
  payerName: string;
  payerEmail: string;
  payerPhone: string;
  description: string;
  customFields: CustomField[];
  lineItems: InvoiceLineItems[];
}

export interface ICreateSplitPaymentInvoice {
  type: "split_payment";
  orderId: string;
  amount: string;
  payerName: string;
  payerEmail: string;
  payerPhone: string;
  description: string;
  lineItems: InvoiceLineItems[];
}

export interface InvoiceStatusRRR {
  type: "rrr";
  value: string;
}

export interface InvoiceStatusOrderId {
  type: "orderId";
  value: string;
}

export interface IMakePaymentDto {
  rrr: string;
  processRrr?: boolean;
  transactionId?: string;
  onSuccess: (dto: IMakePaymentResponse) => void;
  onError: (dto: IMakePaymentResponse) => void;
  onClose: () => void;
}

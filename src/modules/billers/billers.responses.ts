export interface IFetchBillersResponse {
  billerId: string;
  billerName: string;
  billerShortName: string;
  billerLogoUrl: string;
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
}

export interface IFetchBillCategoriesResponse {
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
}

export interface IFetchServicesResponse {
  id: string;
  name: string;
}

export interface IFetchBillersByCategoryResponse {
  billerId: string;
  billerName: string;
  billerShortName: string;
  billerLogoUrl: string;
  categoryId: string;
  categoryName: string;
  categoryDescription: string;
}

export interface IFetchBillerProductsResponse {
  status: string;
  message: string;
  billerId: string;
  categoryId: string;
  products: Product[];
}

export interface Product {
  billPaymentProductId: string;
  billPaymentProductName: string;
  isAmountFixed: boolean;
  amount: number;
  currency: string;
  metadata: Metadata;
}

export interface Metadata {
  customFields: CustomField[];
}

export interface CustomField {
  display_name: string;
  variable_name: string;
  type: string;
  required: boolean;
  sortOrder: string;
  selectOptions?: SelectOption[];
}

export interface SelectOption {
  display_name: string;
  value: string;
}

export interface IValidateCustomerResponse {
  status: string;
  message: string;
  customerId: string;
  billPaymentProductId: string;
  name: any;
  email: any;
  address: any;
  amount: any;
  maximumAmount: any;
  minimumAmount: any;
}

export interface IInitiateTransactionResponse {
  status: string;
  message: string;
  transactionRef: string;
  rrr: string;
  amount: number;
}

export interface ICreateBillPaymentNotificationResponse {
  status: string;
  message: string;
  transactionRef: string;
  rrr: string;
}

export interface CustomField {
  variable_name: string;
  value: string;
}

export interface Metadata {
  transactionDate: string;
  paymentDate: any;
  channel: any;
  receiptUrl: any;
  extraData: any;
  customFields: CustomField[];
}

export interface ILookupTransactionResponse {
  status: string;
  message: string;
  name: string;
  phoneNumber: string;
  email: string;
  transactionRef: any;
  amount: number;
  rrr: string;
  currency: string;
  description: string;
  metadata: Metadata;
}

export interface Metadata3 {
  transactionDate: string;
  paymentDate: string;
  channel: string;
  receiptUrl: string;
  customFields: CustomField[];
}

export interface CustomField {
  display_name: string;
  value: string;
}

export interface IQueryTransactionResponse {
  status: string;
  message: string;
  name: string;
  email: string;
  phoneNumber: string;
  customerId: string;
  transactionRef: string;
  rrr: string;
  paid: boolean;
  amount: number;
  metadata: Metadata3;
}

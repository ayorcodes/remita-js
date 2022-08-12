# Remita JS

Nodejs API wrapper for Remita

## Installation

```
npm i @ayorcodes/remita-js

yarn add @ayorcodes/remita-js
```

## Usage (development)

```javascript
var { initializeRemita } = require("@ayorcodes/remita-js");

await initializeRemita({
  environment: "dev",
});
```

## Usage (production)

Put this in your .env

```env
REMITA_API_KEY=
REMITA_API_TOKEN=
REMITA_MERCHANT_ID=
REMITA_SERVICE_TYPE_ID=
REMITA_PUBLIC_KEY=
REMITA_USERNAME=
REMITA_PASSWORD=
```

Initialize the plugin in your root file

```javascript
await initializeRemita({
  environment: "production",
  apiKey: process.env.REMITA_API_KEY,
  api_token: process.env.REMITA_API_TOKEN,
  merchantId: process.env.REMITA_MERCHANT_ID,
  serviceTypeId: process.env.REMITA_SERVICE_TYPE_ID,
  publicKey: process.env.REMITA_PUBLIC_KEY,
  auth: {
    username: process.env.REMITA_USERNAME,
    password: process.env.REMITA_PASSWORD,
  },
});
```

# Remita Services exposed by the library

## 1. Accept Payments

<!-- - Invoice Generation
- Check transaction status
- Direct Debit -->

- Generate Invoice (Standard)
- Generate Invoice- Split Payment
- Generate Invoice (with Custom Field)
- Generate Invoice- Split Payment (with Custom Field)
- Check Transaction Status (using RRR)
- Check Transaction Status (using Order ID)
- Generate Mandate
- Print Mandate
- OTP Mandate Activation Request
- OTP Mandate Activation Validate
- Mandate Status
- Mandate Payment History
- Stop Mandate
- Send Debit Instruction
- Debit Status
- Cancel Debit Instruction

## 2. Funds Transfer

- Account Enquiry
- Single Payment
- Single Payment Check Status
- Bulk Payment
- Bulk Payment Check Status
- Get Active Banks

## 3. Biller Aggregation Services

- Get All Billers
- Get Bill Categories
- Get Biller By Category
- Get Biller Products
- Validate Customer
- Initiate Transaction
- Get RRR Details
- BillPaymentNotification
- Get Payment Status
- Get Receipt

## 4. Reference Data Services

- Get Salary History By Phone Number
- Get Salary History By Account Number

## 5. Inflight Collections

- Loan Disbursement Notification
- Loan Repayment History
- Stop Loan Collection

# Accept Payments

### Generate Invoice (Standard)

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();

const response = await paymentsService.createInvoice({
  type: "standard",
  amount: "10000",
  orderId: "standardOrderId",
  payerName: "John Doe",
  payerEmail: "doe@gmail.com",
  payerPhone: "09062067384",
  description: "Payment for Septmeber Fees",
});
```

### Generate Invoice- Split Payment

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();

const response = await paymentsService.createInvoice({
  type: "split_payment",
  amount: "10000",
  orderId: "splitPaymentOrderId",
  payerName: "John Doe",
  payerEmail: "doe@gmail.com",
  payerPhone: "09062067384",
  description: "Payment for Septmeber Fees",
  lineItems: [
    {
      lineItemsId: "itemid1",
      beneficiaryName: "Alozie Michael",
      beneficiaryAccount: "6020067886",
      bankCode: "058",
      beneficiaryAmount: "7000",
      deductFeeFrom: "1",
    },
    {
      lineItemsId: "itemid2",
      beneficiaryName: "Folivi Joshua",
      beneficiaryAccount: "0360883515",
      bankCode: "058",
      beneficiaryAmount: "3000",
      deductFeeFrom: "0",
    },
  ],
});
```

### Generate Invoice (with Custom Field)

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();

const response = await paymentsService.createInvoice({
  type: "custom_fields",
  amount: "10000",
  orderId: "customFieldsOrderId",
  payerName: "John Doe",
  payerEmail: "doe@gmail.com",
  payerPhone: "09062067384",
  description: "Payment for Septmeber Fees",
  customFields: [
    {
      name: "Payer TIN",
      value: "1234567890",
      type: "ALL",
    },
    {
      name: "Contract Date",
      value: "2018/06/27",
      type: "ALL",
    },
    {
      name: "Tax Period",
      value: "2018/06/20",
      type: "ALL",
    },
  ],
});
```

### Generate Invoice- Split Payment (with Custom Field)

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();

const response = await paymentsService.createInvoice({
  type: "custom_fields_split_payment",
  amount: "10000",
  orderId: "customFieldsSplitPaymentOrderId",
  payerName: "John Doe",
  payerEmail: "doe@gmail.com",
  payerPhone: "09062067384",
  description: "Payment for Septmeber Fees",
  customFields: [
    {
      name: "Payer TIN",
      value: "1234567890",
      type: "ALL",
    },
    {
      name: "Contract Date",
      value: "2018/06/27",
      type: "ALL",
    },
    {
      name: "Tax Period",
      value: "2018/06/20",
      type: "ALL",
    },
  ],
  lineItems: [
    {
      lineItemsId: "itemid1",
      beneficiaryName: "Alozie Michael",
      beneficiaryAccount: "6020067886",
      bankCode: "058",
      beneficiaryAmount: "7000",
      deductFeeFrom: "1",
    },
    {
      lineItemsId: "itemid2",
      beneficiaryName: "Alozie Michael",
      beneficiaryAccount: "6020067886",
      bankCode: "058",
      beneficiaryAmount: "3000",
      deductFeeFrom: "1",
    },
  ],
});
```

### Check Transaction Status (using RRR)

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();

const response = await paymentsService.getInvoiceStatus({
  type: "rrr",
  value: "85768465845",
});
```

### Check Transaction Status (using Order ID)

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();

const response = await paymentsService.getInvoiceStatus({
  type: "orderId",
  value: "456775689",
});
```

### Make invoice payment with Remita

```
Add this script to your html

<script src="https://remitademo.net/payment/v1/remita-pay-inline.bundle.js"></script>
```

#### This function will trigger remita's payment interface for invoice payment.

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();

const response = await paymentsService.showPaymentWindow({
  rrr: "456775689",
  processRrr: true,
  transactionId: "customTransactionId", // If not provided, remita will auto-generate one
  onSuccess: function (response) {
    console.log("callback Successful Response", response);
  },
  onError: function (response) {
    console.log("callback Error Response", response);
  },
  onClose: function () {
    console.log("closed");
  },
});
```

### Generate Mandate

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();

const response = await paymentsService.createMandate({
  payerName: "Oshadami Mike",
  payerEmail: "oshadami@example.com",
  payerPhone: "08012345678",
  payerBankCode: "057",
  payerAccount: "0035509366",
  amount: "5000",
  startDate: "05/09/2022",
  endDate: "09/10/2022",
  maxNoOfDebits: 5,
  customFields: [],
  mandateType: "DD",
});
```

### Print Mandate

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();
```

### OTP Mandate Activation Request

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();

const response = await paymentsService.getMandateOTP({
  mandateId: "098768900",
  requestId: "567890980",
});
```

### OTP Mandate Activation Validate

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();

const response = await paymentsService.validateMandateOTP({
  remitaTransRef: "5768908769",
  authParams: [
    {
      param1: "OTP",
      value: "1234",
    },
    {
      param2: "CARD",
      value: "0441234567890",
    },
  ],
});
```

### Mandate Status

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();

await paymentsService.getMandateStatus({
  mandateId: "098768900",
  requestId: "567890980",
});
```

### Mandate Payment History

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();

const response = await paymentsService.getMandatePaymentHistory({
  mandateId: "098768900",
  requestId: "567890980",
});
```

### Stop Mandate

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();

const response = await paymentsService.stopMandate({
  mandateId: "098768900",
  requestId: "567890980",
});
```

### Send Debit Instruction

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();

const response = await paymentsService.sendDebitInstruction({
  fundingAccount: "0035509366",
  fundingBankCode: "057",
  mandateId: "098768900",
  totalAmount: "1000",
});
```

### Debit Status

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();

const response = await paymentsService.getDebitInstructionStatus({
  mandateId: "098768900",
  requestId: "586978069",
});
```

### Cancel Debit Instruction

```javascript
const { PaymentsService } = require("@ayorcodes/remita-js");

const paymentsService = new PaymentsService();

const response = await paymentsService.cancelDebitInstruction({
  mandateId: "098768900",
  requestId: "586978069",
  transactionRef: "6578908756",
});
```

# Funds Transfer

### Account Enquiry

```javascript
const { FundsTransferService } = require("@ayorcodes/remita-js");

const fundsTransferService = new FundsTransferService();

const response = await fundsTransferService.accountLookup({
  sourceAccount: "4589999044",
  sourceBankCode: "044",
});
```

### Single Payment

```javascript
const { FundsTransferService } = require("@ayorcodes/remita-js");

const fundsTransferService = new FundsTransferService();

const response = await fundsTransferService.createPayment({
  type: "single",
  amount: 1000,
  transactionDescription: "Payment for services",
  channel: "WEB",
  currency: "NGN",
  destinationAccount: "4589999044",
  destinationAccountName: "Doe John",
  destinationBankCode: "044",
  destinationEmail: "Doe.john@specs.com",
  sourceAccount: "8909090989",
  sourceAccountName: "Femi John",
  sourceBankCode: "058",
  originalAccountNumber: "8909090989",
  originalBankCode: "058",
  customReference: "",
});
```

### Single Payment Check Status

```javascript
const { FundsTransferService } = require("@ayorcodes/remita-js");

const fundsTransferService = new FundsTransferService();

const response = await fundsTransferService.getPaymentStatus({
  type: "single",
  transRef: "97Y45T9845T0",
});
```

### Bulk Payment

```javascript
const { FundsTransferService } = require("@ayorcodes/remita-js");

const fundsTransferService = new FundsTransferService();

const response = await fundsTransferService.createPayment({
  type: "bulk",
  totalAmount: 4500,
  sourceAccount: "8909090989",
  sourceAccountName: "ABC",
  sourceBankCode: "058",
  currency: "NGN",
  sourceNarration: "Bulk Transfer",
  originalAccountNumber: "8909090989",
  originalBankCode: "058",
  customReference: "",
  transactions: [
    {
      amount: 2500,
      transactionRef: "ngnerngkng",
      destinationAccount: "0037475942",
      destinationAccountName: "Kelvin John",
      destinationBankCode: "058",
      destinationNarration: "Bulk Transfer",
    },
    {
      amount: 1500,
      transactionRef: "gknbergbeorg",
      destinationAccount: "0037475942",
      destinationAccountName: "Martin John",
      destinationBankCode: "058",
      destinationNarration: "Bulk Transfer",
    },
    {
      amount: 500,
      transactionRef: "rgnbergwrejgpeg",
      destinationAccount: "0037475942",
      destinationAccountName: "Mike John",
      destinationBankCode: "058",
      destinationNarration: "Bulk Transfer",
    },
  ],
});
```

### Bulk Payment Check Status

```javascript
const { FundsTransferService } = require("@ayorcodes/remita-js");

const fundsTransferService = new FundsTransferService();

const response = await fundsTransferService.getPaymentStatus({
  type: "bulk",
  batchRef,
});
```

### Get Active Banks

```javascript
const { FundsTransferService } = require("@ayorcodes/remita-js");

const fundsTransferService = new FundsTransferService();

const response = await fundsTransferService.getActiveBanks();
```

# Biller Aggregation Services

### Get All Billers

```javascript
const { BillerAggregationService } = require("@ayorcodes/remita-js");

const billerAggregationService = new BillerAggregationService();

const response = await billerAggregationService.getBillers();
```

### Get Bill Categories

```javascript
const { BillerAggregationService } = require("@ayorcodes/remita-js");

const billerAggregationService = new BillerAggregationService();

const response = await billerAggregationService.getBillCategories();
```

### Get Biller By Category

```javascript
const { BillerAggregationService } = require("@ayorcodes/remita-js");

const billerAggregationService = new BillerAggregationService();

const response = await billerAggregationService.getBillersByCategory(
  "categoryId"
);
```

### Get Biller Products

```javascript
const { BillerAggregationService } = require("@ayorcodes/remita-js");

const billerAggregationService = new BillerAggregationService();

const response = await billerAggregationService.getBillerProducts("billerId");
```

### Validate Customer

```javascript
const { BillerAggregationService } = require("@ayorcodes/remita-js");

const billerAggregationService = new BillerAggregationService();

const response = await billerAggregationService.validateCustomer({
  billPaymentProductId: "627389687",
  customerId: "1010101020",
});
```

### Initiate Transaction

```javascript
const { BillerAggregationService } = require("@ayorcodes/remita-js");

const billerAggregationService = new BillerAggregationService();

const response = await billerAggregationService.initiateBillPayment({
  billPaymentProductId: "41958636",
  amount: 2000.0,
  transactionRef: "5768790",
  name: "Henry George",
  email: "henry@xyz.com",
  phoneNumber: "080123456789",
  customerId: "henry@xyz.com",
  metadata: {
    customFields: [
      {
        variable_name: "size",
        value: "40abc",
      },
    ],
  },
});
```

### Get RRR Details

```javascript
const { BillerAggregationService } = require("@ayorcodes/remita-js");

const billerAggregationService = new BillerAggregationService();

const response = await billerAggregationService.getBillPayment("RRR");
```

### Bill Payment Notification

```javascript
const { BillerAggregationService } = require("@ayorcodes/remita-js");

const billerAggregationService = new BillerAggregationService();

const response = await billerAggregationService.createBillPaymentNotification({
  rrr: "290008214793",
  transactionRef: "transactionRef",
  amount: 3814.13,
  channel: "pos",
  metadata: {
    fundingSource: "TESTACCOUNT",
  },
});
```

### Get Payment Status

```javascript
const { BillerAggregationService } = require("@ayorcodes/remita-js");

const billerAggregationService = new BillerAggregationService();
```

### Get Receipt

```javascript
const { BillerAggregationService } = require("@ayorcodes/remita-js");

const billerAggregationService = new BillerAggregationService();
```

# Reference Data Services

### Get Salary History By Phone Number

```javascript
const { ReferenceDataService } = require("@ayorcodes/remita-js");

const referenceDataService = new ReferenceDataService();

const response = await referenceDataService.getSalaryHistory({
  type: "phoneNumber",
  authorisationCode: "56789084",
  phoneNumber: "07038684773",
  authorisationChannel: "USSD",
});
```

### Get Salary History By Account Number

```javascript
const { ReferenceDataService } = require("@ayorcodes/remita-js");

const referenceDataService = new ReferenceDataService();

const response = await referenceDataService.getSalaryHistory({
  type: "accountNumber",
  authorisationCode: "56789084",
  accountNumber: "1234657893",
  bankCode: "214",
  authorisationChannel: "USSD",
});
```

# Inflight Collections

### Loan Disbursement Notification

```javascript
const { InflightCollectionsService } = require("@ayorcodes/remita-js");

const inflightCollectionsService = new InflightCollectionsService();

const response = await inflightCollectionsService.loanDisbursementNotification({
  customerId: "a@email.com",
  authorisationCode: "90494",
  authorisationChannel: "USSD",
  phoneNumber: "07038684773",
  accountNumber: "1234657893",
  currency: "NGN",
  loanAmount: 2000,
  collectionAmount: 2100,
  dateOfDisbursement: "11-06-2020 10:16:18+0000",
  dateOfCollection: "11-06-2020 10:16:18+0000",
  totalCollectionAmount: 2100,
  numberOfRepayments: 1,
  bankCode: "011",
});
```

### Loan Repayment History

```javascript
const { InflightCollectionsService } = require("@ayorcodes/remita-js");

const inflightCollectionsService = new InflightCollectionsService();

const response = await inflightCollectionsService.getLoanRepaymentHistory({
  authorisationCode: "748494",
  mandateRef: "768987498",
  customerId: "a@email.com",
});
```

### Stop Loan Collection

```javascript
const { InflightCollectionsService } = require("@ayorcodes/remita-js");

const inflightCollectionsService = new InflightCollectionsService();

const response = await inflightCollectionsService.stopLoanCollection({
  authorisationCode: "748494",
  mandateReference: "768987498",
  customerId: "a@email.com",
});
```

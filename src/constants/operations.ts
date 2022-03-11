export const RemitaOperations = {
  mandate: {
    create: 'create_mandate',
    stop: 'stop_mandate',
    request_otp: 'request_otp_mandate',
    validate_otp: 'validate_otp_mandate',
    status: 'status_mandate',
    payment_history: 'payment_history_mandate',
  },
  debitInstruction: {
    create: 'create_debit_instruction',
    status: 'status_debit_instruction',
    cancel: 'cancel_debit_instruction',
  },
  checkout: {},
  invoice: {
    create: 'create_invoice',
    // create_split_payment: 'create_split_payment_invoice',
    // create_custom: 'create_custom_invoice',
    // create_custom_split_payment: 'create_custom_split_payment_invoice',
    cancel: 'cancel_invoice',
    status: 'status_invoice',
  },
  payments: {
    account_lookup: 'account_lookup',
    get_active_banks: 'get_active_banks',
  },
  billers: {
    payment_notification: 'payment_notification',
  },
};

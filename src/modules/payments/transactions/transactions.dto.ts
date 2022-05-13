export interface IFetchSinglePayment {
  // type: 'single';
  transRef: string;
}

export interface IFetchBulkPayment {
  // type: 'batch';
  batchRef: string;
}

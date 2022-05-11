import { initializeRemita, ReferenceDataService } from '../src';
jest.setTimeout(10000);

let referenceDataService: ReferenceDataService;

let authorisationCode = '334523457';
let mandateReference = '';
let customerId = '456783897';

describe('Reference Data Tests', () => {
  beforeAll(async () => {
    await initializeRemita({
      environment: 'dev',
    });

    referenceDataService = new ReferenceDataService();
  });

  it('should find test', () => {
    expect(2).toBeLessThanOrEqual(2);
  });

  // it('should fetch salary history', async () => {
  //   const response = await referenceDataService.getSalaryHistory({
  //     authorisationCode,
  //     firstName: 'Teresa',
  //     lastName: 'Stoker',
  //     middleName: 'R',
  //     accountNumber: '5012284010',
  //     bankCode: '023',
  //     bvn: '22222222223',
  //     authorisationChannel: 'USSD',
  //   });
  // });

  // it('should fetch user by NIN', async () => {
  //   const response = await referenceDataService.getUserInfoByNIN({
  //     // nin: '98637126031',
  //     nin: '0123456789',
  //     authorisationCode: '67777777',
  //     authorisationChannel: 'USSD',
  //   });
  // });
});

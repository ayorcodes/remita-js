import { IRemitaConfig } from '../interfaces/IRemitaConfig';

export let configuration: Partial<IRemitaConfig> = {};

export let bearerToken = '';

export const handleApiUrl = () => {
  const apiUrl =
    configuration.environment == 'dev'
      ? 'https://remitademo.net/remita/exapp/api/v1/send/api/'
      : 'https://login.remita.net/remita/exapp/api/v1/send/api/';
  const getApiUrl =
    configuration.environment == 'dev'
      ? 'https://remitademo.net/remita/ecomm/send/api/'
      : 'https://login.remita.net/remita/ecomm/send/api/';

  return { apiUrl, getApiUrl };
};

export let testConfig = {
  paymentsModule: {
    merchantId: '2547916',
    serviceTypeId: '4430731',
    apiKey: '1946',
  },
  // directDebit: {
  //   merchantId: '27768931',
  //   serviceTypeId: '35126630',
  //   apiKey: 'Q1dHREVNTzEyMzR8Q1dHREVNTw==',
  //   api_token:
  //     'SGlQekNzMEdMbjhlRUZsUzJCWk5saDB6SU14Zk15djR4WmkxaUpDTll6bGIxRCs4UkVvaGhnPT0=',
  // },
  fundsTransferModule: {
    merchantId: 'DEMOMDA1234',
    apiKey: 'REVNT01EQTEyMzR8REVNT01EQQ',
    api_token:
      'bmR1ZFFFWEx5R2c2NmhnMEk5a25WenJaZWZwbHFFYldKOGY0bHlGZnBZQ1N5WEpXU2Y1dGt3PT0=',
  },
  referenceDataModule: {
    merchantId: '27768931',
    serviceTypeId: '35126630',
    apiKey: 'Q1dHREVNTzEyMzR8Q1dHREVNTw==',
    api_token:
      'SGlQekNzMEdMbjhlRUZsUzJCWk5saDB6SU14Zk15djR4WmkxaUpDTll6bGIxRCs4UkVvaGhnPT0=',
    publicKey:
      'U0hFTEx8NDA4MTcyOTh8Y2FjZjNhNDY5NzU5ZjA4OWM1ZGVhN2E2YTRkMzEyNTczMjljYTU1OTJjNzg1NWQyYjNiMTM4OGM5OTNmZGFjYWFjODkwMDFhMWFkZjYwYzJiZDQyZjZhMjkzNTFiNDgyMWI4MWJlMzhmOWU3ZjA1YzI5ZWM0NTViZGQzNGMzOGM=',
  },
  inflightCollectionsModule: {
    merchantId: '27768931',
    serviceTypeId: '35126630',
    apiKey: 'Q1dHREVNTzEyMzR8Q1dHREVNTw==',
    api_token:
      'SGlQekNzMEdMbjhlRUZsUzJCWk5saDB6SU14Zk15djR4WmkxaUpDTll6bGIxRCs4UkVvaGhnPT0=',
    publicKey:
      'U0hFTEx8NDA4MTcyOTh8Y2FjZjNhNDY5NzU5ZjA4OWM1ZGVhN2E2YTRkMzEyNTczMjljYTU1OTJjNzg1NWQyYjNiMTM4OGM5OTNmZGFjYWFjODkwMDFhMWFkZjYwYzJiZDQyZjZhMjkzNTFiNDgyMWI4MWJlMzhmOWU3ZjA1YzI5ZWM0NTViZGQzNGMzOGM=',
  },
  billerAggregationModule: {
    publicKey:
      'U0hFTEx8NDA4MTcyOTh8Y2FjZjNhNDY5NzU5ZjA4OWM1ZGVhN2E2YTRkMzEyNTczMjljYTU1OTJjNzg1NWQyYjNiMTM4OGM5OTNmZGFjYWFjODkwMDFhMWFkZjYwYzJiZDQyZjZhMjkzNTFiNDgyMWI4MWJlMzhmOWU3ZjA1YzI5ZWM0NTViZGQzNGMzOGM=',
  },
};

export const setConfig = (config: any) => {
  configuration = config;
};

export const setToken = (token: string) => {
  bearerToken = token;
};

import {
  IRemitaConfig,
  IRemitaLiveConfig,
  IRemitaTestConfig,
} from '../interfaces/IRemitaConfig';
import { Helper } from '../shared/helpers';
import {
  configuration,
  handleApiUrl,
  setConfig,
  setToken,
} from './configuration';

import axios from 'axios';

export const initializeRemita = async (
  config: IRemitaTestConfig | IRemitaLiveConfig
) => {
  console.log('called init');
  if (config.environment == 'dev') {
    setConfig({
      merchantId: '27768931',
      serviceTypeId: '35126630',
      apiKey: 'Q1dHREVNTzEyMzR8Q1dHREVNTw==',
      api_token:
        'SGlQekNzMEdMbjhlRUZsUzJCWk5saDB6SU14Zk15djR4WmkxaUpDTll6bGIxRCs4UkVvaGhnPT0=',
      environment: 'dev',
      auth: {
        username: 'K9U6PFCLIID7MAN5',
        password: '5D5QVBNDMXU56TEWTO1QTXPOGOZL4TRV',
      },
    });
  } else {
    setConfig(config);
  }

  const api = axios.create({
    baseURL: handleApiUrl().apiUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  console.log(api.defaults.baseURL);
  console.log(configuration.auth);

  const response = await api.post('uaasvc/uaa/token', configuration.auth);
  const result = Helper.handleResponse(response, 'global', false);
  console.log(result);
  setToken(result.data[0].accessToken);

  return configuration;
};

// exp initializeRemita;

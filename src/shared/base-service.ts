import axios from 'axios';
import {
  configuration,
  handleApiUrl,
  testConfig,
} from '../config/configuration';
import { Helper } from './helpers';
const sha512 = require('js-sha512').sha512;

export class BaseService {
  private key: string;
  private config: any = {};

  constructor(key: string) {
    this.key = key;
    if (configuration.environment == 'dev') {
      this.config = testConfig[this.key];
      // console.log({ dev: this.config });
    } else {
      // console.log({ prod: this.config });
      this.config = configuration;
    }
  }

  protected request(type = 'apiv1') {
    return axios.create({
      baseURL:
        type == 'apiv1' ? handleApiUrl().apiUrl : handleApiUrl().getApiUrl,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }

  protected process(operation: string = '', opts = {}) {
    return Helper.process(operation, opts, this.config);
  }
}

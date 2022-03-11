export interface IRemitaTestConfig {
  environment: 'dev';
}

export interface IRemitaLiveConfig {
  environment: 'production';
  merchantId: string;
  serviceTypeId: string;
  apiKey: string;
  api_token: string;
  auth?: {
    username: string;
    password: string;
  };
}

export interface IRemitaConfig {
  environment: 'dev' | 'production';
  merchantId: string;
  serviceTypeId: string;
  apiKey: string;
  api_token: string;
  auth?: {
    username: string;
    password: string;
  };
}

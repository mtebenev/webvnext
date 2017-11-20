import {IEnvironment} from './ienvironment';

export const environment: IEnvironment = {
  production: false,
  identityServerConfig: {
    clientBaseUrl: 'http://localhost:4200',
    serverUrl: 'http://localhost:63161'
  }
};

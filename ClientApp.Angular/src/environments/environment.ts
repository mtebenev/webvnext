import {IEnvironment} from './ienvironment';

export const environment: IEnvironment = {
  production: false,
  identityServerConfig: {
    clientBaseUrl: 'http://localhost:4200',
    serverUrl: 'http://localhost:3200'
  },
  apiBaseUrl: 'http://localhost:5200/api'
};

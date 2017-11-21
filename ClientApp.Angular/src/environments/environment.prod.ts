import {IEnvironment} from './ienvironment';

export const environment: IEnvironment = {
  production: true,
  identityServerConfig: {
    clientBaseUrl: 'http://webvnextapi.azurewebsites.net',
    serverUrl: 'http://webvnextid.azurewebsites.net'
  },
  apiBaseUrl: 'http://webvnextapi.azurewebsites.net/api'
};

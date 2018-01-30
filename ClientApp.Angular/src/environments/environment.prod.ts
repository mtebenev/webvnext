import {IEnvironment} from './ienvironment';

export const environment: IEnvironment = {
  production: true,
  identityServerConfig: {
    clientId: 'angularclient',
    clientBaseUrl: 'http://webvnextapi.azurewebsites.net',
    serverUrl: 'http://webvnextid.azurewebsites.net'
  },
  apiBaseUrl: 'http://webvnextapi.azurewebsites.net/api',
  translationsPathPrefix: '/dist/ClientApp.Angular/assets/i18n/'
};

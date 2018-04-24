import {IEnvironment} from './ienvironment';

export const environment: IEnvironment = {
  production: true,
  identityServerConfig: {
    clientId: 'angularclient',
    clientBaseUrl: 'http://webvnext.azurewebsites.net/angular',
    serverUrl: 'http://webvnextid.azurewebsites.net'
  },
  apiBaseUrl: 'http://webvnext.azurewebsites.net/api',
  translationsPathPrefix: '/.Modules/ClientApp.Angular/dist/ClientApp.Angular/assets/i18n/'
};

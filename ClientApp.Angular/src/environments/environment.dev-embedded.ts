import {IEnvironment} from './ienvironment';

export const environment: IEnvironment = {
  production: false,
  identityServerConfig: {
    clientId: 'angularclient-dev-embedded',
    clientBaseUrl: 'http://localhost:5200/angular',
    serverUrl: 'http://localhost:3200'
  },
  apiBaseUrl: 'http://localhost:5200/api',
  translationsPathPrefix: '/.Modules/ClientApp.Angular/dist/assets/i18n/'
};

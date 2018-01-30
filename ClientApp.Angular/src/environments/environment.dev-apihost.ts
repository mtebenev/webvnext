import {IEnvironment} from './ienvironment';

// TODO MTE: this environment should be used when hosting client app inside web api host during development
// Need to configure client build with NgAspNetCore so that it uses the environment.

export const environment: IEnvironment = {
  production: false,
  identityServerConfig: {
    clientId: 'angularclient_hosted',
    clientBaseUrl: 'http://localhost:5200',
    serverUrl: 'http://localhost:3200'
  },
  apiBaseUrl: 'http://localhost:5200/api',
  translationsPathPrefix: '/dist/ClientApp.Angular/assets/i18n/'
};

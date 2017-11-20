import {IIdentityServerConfig} from './iidentity-server.config';

/**
 * Defines run-time properties for the application
 */
export interface IEnvironment {

  production: boolean;
  identityServerConfig: IIdentityServerConfig;
}

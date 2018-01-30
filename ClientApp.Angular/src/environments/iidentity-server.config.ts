/**
 * Properties for configuring identity server
 */
export interface IIdentityServerConfig {

  /**
   * Client identification (we are using multiple IDs for different deployment types)
   */
  clientId: string;

  /**
   * Identity server URL
   */
  serverUrl: string;

  /**
   * Base URL where the client application deployed
   */
  clientBaseUrl: string;

}

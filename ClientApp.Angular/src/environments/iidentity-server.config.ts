/**
 * Properties for configuring identity server
 */
export interface IIdentityServerConfig {

  /**
   * Identity server URL
   */
  serverUrl: string;

  /**
   * Base URL where the client application deployed
   */
  clientBaseUrl: string;

}

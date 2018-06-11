/**
 * Provides OpenID access token
 */
export interface IAuthTokenProvider {

  /**
   * Returns access token for API
   */
  getAccessToken(): Promise<string>;
}

import {OidcSecurityService} from 'angular-auth-oidc-client';
import {IAuthTokenProvider} from 'client-common-lib';

/**
 * Wraps oidc service and provides access token for http services
 */
export class AuthTokenProviderOidc implements IAuthTokenProvider {

  private _oidcSecurityService: OidcSecurityService;

  constructor(oidcSecurityService: OidcSecurityService) {
    this._oidcSecurityService = oidcSecurityService;
  }

  /**
   * IAuthTokenProvider
   */
  public async getAccessToken(): Promise<string> {

    const token = this._oidcSecurityService.getToken();
    return Promise.resolve(token);
  }
}

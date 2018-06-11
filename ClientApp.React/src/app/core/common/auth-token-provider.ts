import {UserManager} from 'oidc-client';
import {IAuthTokenProvider} from 'client-common-lib';

/**
 * Wraps oidc service and provides access token for http services
 */
export class AuthTokenProvider implements IAuthTokenProvider {

  private _userManager: UserManager;

  constructor(userManager: UserManager) {
    this._userManager = userManager;
  }

  /**
   * IAuthTokenProvider
   */
  public async getAccessToken(): Promise<string> {

    const user = await this._userManager.getUser();

    if(!user || !user.access_token)
      throw new Error('Unexpected: cannot get user and token for the session');

    return user.access_token;
  }
}

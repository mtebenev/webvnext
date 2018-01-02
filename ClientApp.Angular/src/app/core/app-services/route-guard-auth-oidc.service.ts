import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {OidcSecurityService} from 'angular-auth-oidc-client';

import {Deferred} from '../core/deferred';

/**
 * Authentication guard based on 'angular-auth-oidc-client' library
 */
@Injectable()
export class RouteGuardAuthOidc implements CanActivate {

  private isAuthorized: boolean;
  private deferredAuthenticationReady: Deferred<boolean>; // Resolved when oidc client initialized. Ttrue if the window has hash

  constructor(private oidcSecurityService: OidcSecurityService) {

    this.isAuthorized = false;
    this.deferredAuthenticationReady = new Deferred();

    this.oidcSecurityService.getIsAuthorized().subscribe(isAuthorized => {
      this.isAuthorized = isAuthorized;
    });

    if (this.oidcSecurityService.moduleSetup)
      this.doCallbackLogicIfRequired();
    else {
      this.oidcSecurityService.onModuleSetup.subscribe(() => {
        this.doCallbackLogicIfRequired();
      });
    }
  }

  /**
   * CanActivate
   */
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    let promise = new Promise<boolean>((resolve) => {

      this.deferredAuthenticationReady.promise.then((isHashSet) => {

        if (!this.isAuthorized && !isHashSet) {
          this.oidcSecurityService.authorize();
        } else {
          resolve(this.isAuthorized);
        }
      });
    });
    return promise;
  }

  private doCallbackLogicIfRequired() {

    let isHashSet = false;
    if (window.location.hash) {
      isHashSet = true;
      this.oidcSecurityService.authorizedCallback();
    }

    // Let oidc client update authorization state
    setTimeout(() => {
      this.deferredAuthenticationReady.resolve(isHashSet);
    });
  }
}

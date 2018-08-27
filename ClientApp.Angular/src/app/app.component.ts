import {Component, ViewChild} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {MatSidenav} from '@angular/material';

import {TranslateService} from '@ngx-translate/core';
import {Subscription, filter} from '@common/rxjs-imports';
import {OidcSecurityService} from 'angular-auth-oidc-client';

import {IAppCommands} from './iapp-commands';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements IAppCommands {

  private _subscriptionRouter: Subscription;
  private _subscriptionMedia: Subscription;
  private _isMobileMode: boolean;
  private _isDesktopMode: boolean;
  private _isSidebarOpen: boolean;
  private _media: ObservableMedia;
  private _oidcSecurityService: OidcSecurityService;

  constructor(translateService: TranslateService, media: ObservableMedia, router: Router, oidcSecurityService: OidcSecurityService) {

    this._media = media;
    this._oidcSecurityService = oidcSecurityService;

    translateService.setDefaultLang('en');
    translateService.use('en');

    // Listen to media change to redraw sidebar
    // Note MTE: in original Material sample there's ChangeDetectorRef used. Really need that?
    this._subscriptionMedia = media.subscribe((mediaChange: MediaChange) => {
      this._isMobileMode = this._media.isActive('lt-md');
      this._isDesktopMode = this._media.isActive('gt-md');
    });

    // Listen router and hide nav sidebar when navigation occurres
    this._subscriptionRouter = router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.onNavigationEnd();
      });

    this._isMobileMode = this._media.isActive('lt-sm'); // Initial layout
    this._isDesktopMode = this._media.isActive('xl');
    this._isSidebarOpen = false;
  }

  @ViewChild(MatSidenav)
  public sideNav?: MatSidenav;

  /**
   * OnDestroy
   */
  public ngOnDestroy(): void {

    if(this._subscriptionMedia) {
      this._subscriptionMedia.unsubscribe();
    }

    if(this._subscriptionRouter) {
      this._subscriptionRouter.unsubscribe();
    }
  }

  /**
   * Bound flag for rendering layout for mobiles
   */
  public get isMobileMode(): boolean {
    return this._isMobileMode;
  }

  /**
   * Bound flag for rendering layout for desktop
   */
  public get isDesktopMode(): boolean {
    return this._isDesktopMode;
  }

  public get isSidebarOpen(): boolean {

    const result = this.isDesktopMode
      ? true
      : this._isSidebarOpen;

    return result;
  }

  /**
   * IAppCommands
   */
  public toggleAppMenu(): void {
    this.sideNav!.toggle();
  }

  /**
   * IAppCommands
   */
  public logOut(): void {
    this._oidcSecurityService.logoff();
  }

  private onNavigationEnd(): void {

    // For mobiles close sidenav after navigation
    if(this._isMobileMode) {
      this.sideNav!.close();
    }
  }
}

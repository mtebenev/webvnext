import {Component, ViewChild} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

import {MatSidenav} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

import {ISubscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private _subscriptionRouter: ISubscription;
  private _subscriptionMedia: ISubscription;
  private _isMobileMode: boolean;

  constructor(private httpClient: HttpClient, private translateService: TranslateService, private media: ObservableMedia, router: Router) {

    translateService.setDefaultLang('en');
    translateService.use('en');

    // Listen to media change to redraw sidebar
    // Note MTE: in original Material sample there's ChangeDetectorRef used. Really need that?
    this._subscriptionMedia = media.subscribe((mediaChange: MediaChange) => {
      this._isMobileMode = this.media.isActive('lt-sm');
    });

    // Listen router and hide nav sidebar when navigation occurres
    this._subscriptionRouter = router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event) => {
        this.onNavigationEnd();
      });

    this._isMobileMode = this.media.isActive('lt-sm'); // Initial layout
  }

  @ViewChild(MatSidenav)
  public sideNav: MatSidenav;

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
   * Invoked when user clicks Menu button in app header
   */
  public handleMenuButtonClick(): void {
    this.sideNav.toggle();
  }

  private onNavigationEnd(): void {

    // For mobiles close sidenav after navigation
    if(this._isMobileMode) {
      this.sideNav.close();
    }
  }
}

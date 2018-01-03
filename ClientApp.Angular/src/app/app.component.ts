import {Component, ChangeDetectorRef, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MediaMatcher} from '@angular/cdk/layout';

import {MatSidenav} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private _mobileModeQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  private _isMobileMode: boolean;

  constructor(private httpClient: HttpClient, private translateService: TranslateService, changeDetectorRef: ChangeDetectorRef, mediaMatcher: MediaMatcher) {

    translateService.setDefaultLang('en');
    translateService.use('en');

    // Listen to media change to redraw sidebar
    this._mobileQueryListener = () => {
      this._isMobileMode = this._mobileModeQuery.matches;
      changeDetectorRef.detectChanges();
    }
    this._mobileModeQuery = mediaMatcher.matchMedia('(max-width: 600px)');
    this._mobileModeQuery.addListener(this._mobileQueryListener);
    this._isMobileMode = this._mobileModeQuery.matches;
  }

  @ViewChild(MatSidenav)
  public sideNav: MatSidenav;

  /**
   * OnDestroy
   */
  public ngOnDestroy(): void {
    this._mobileModeQuery.removeListener(this._mobileQueryListener);
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
}

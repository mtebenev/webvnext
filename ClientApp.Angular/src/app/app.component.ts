import {Component, ViewChild} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

import {MatSidenav} from '@angular/material';
import {TranslateService} from '@ngx-translate/core';

import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private _mediaSubscription: ISubscription;
  private _isMobileMode: boolean;

  constructor(private httpClient: HttpClient, private translateService: TranslateService, private media: ObservableMedia) {

    translateService.setDefaultLang('en');
    translateService.use('en');

    // Listen to media change to redraw sidebar
    // Note MTE: in original Material sample there's ChangeDetectorRef used. Really need that?
    this._mediaSubscription = media.subscribe((mediaChange: MediaChange) => {
      this._isMobileMode = this.media.isActive('lt-sm');
    });

    this._isMobileMode = this.media.isActive('lt-sm'); // Initial layout
  }

  @ViewChild(MatSidenav)
  public sideNav: MatSidenav;

  /**
   * OnDestroy
   */
  public ngOnDestroy(): void {

    if (this._mediaSubscription) {
      this._mediaSubscription.unsubscribe();
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
}

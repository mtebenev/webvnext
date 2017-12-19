import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {TranslateService} from '@ngx-translate/core';
import {OidcSecurityService} from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

  constructor(private httpClient: HttpClient, private translateService: TranslateService) {

    translateService.setDefaultLang('en');
    translateService.use('en');
  }

  /**
   * OnDestroy
   */
  public ngOnDestroy(): void {
  }
}

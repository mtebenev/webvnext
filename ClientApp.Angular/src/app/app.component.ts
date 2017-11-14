import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {OidcSecurityService} from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  public title = 'app';

  public output: string;

  constructor(private httpClient: HttpClient) {
  }

  /**
   * OnDestroy
   */
  public ngOnDestroy(): void {
  }

  public handleLoadContactsClick(): void {
/*
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    const token = this.oidcSecurityService.getToken();
    if (token !== '') {
      const tokenValue = 'Bearer ' + token;
      headers = headers.set('Authorization', tokenValue);
    }

    this.httpClient.get('http://localhost:52563/api/contacts', {headers:headers})
      .subscribe((data) => {
        this.output = JSON.stringify(data);

      }, (error) => {
        alert('error loading data!');
        this.output = JSON.stringify(error);
      });
      */
  }

  /*
  public handleLoginClick() {
    this.oidcSecurityService.authorize();
  }

  public handleLogoutClick() {
    this.oidcSecurityService.logoff();
  }
  */

}

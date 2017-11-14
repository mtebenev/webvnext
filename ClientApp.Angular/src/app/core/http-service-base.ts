import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {OidcSecurityService} from 'angular-auth-oidc-client';

/**
 * Provides common functionality for HTTP services in application
 */
export abstract class HttpServiceBase {

  constructor(private oidcSecurityService: OidcSecurityService, private httpClient: HttpClient, private baseUrl: string, private serviceName: string) {
  }

  protected doGet<TResult>(): Observable<TResult> {

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    const token = this.oidcSecurityService.getToken();
    if (token !== '') {
      const tokenValue = 'Bearer ' + token;
      headers = headers.set('Authorization', tokenValue);
    }

    return this.httpClient.get<TResult>('http://localhost:52563/api/companies', {headers: headers});
  }
}

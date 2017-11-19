import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {OidcSecurityService} from 'angular-auth-oidc-client';

/**
 * Provides common functionality for HTTP services in application
 */
export abstract class HttpServiceBase {

  constructor(private oidcSecurityService: OidcSecurityService, private httpClient: HttpClient, private baseUrl: string, private serviceName: string) {
  }

  /**
   * Use to perform GET request
   */
  protected doGet<TResult>(action: string, params?: {[index: string]: string}): Observable<TResult> {

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    const token = this.oidcSecurityService.getToken();
    if (token !== '') {
      const tokenValue = 'Bearer ' + token;
      headers = headers.set('Authorization', tokenValue);
    }

    let url = this.createMethodUrl(action);
    return this.httpClient.get<TResult>(url, {params: params, headers: headers});
  }

  /**
   * Use to perform POST request
   */
  protected doPost<TPayload, TResult>(payload: TPayload): Observable<TResult> {

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    const token = this.oidcSecurityService.getToken();
    if (token !== '') {
      const tokenValue = 'Bearer ' + token;
      headers = headers.set('Authorization', tokenValue);
    }

    let url = this.createMethodUrl(null);
    return this.httpClient.post<TResult>(url, payload, {headers: headers});
  }

  protected doPut<TPayload>(params?: {[index: string]: string}, payload?: TPayload): Observable<void> {

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    const token = this.oidcSecurityService.getToken();
    if (token !== '') {
      const tokenValue = 'Bearer ' + token;
      headers = headers.set('Authorization', tokenValue);
    }

    let url = this.createMethodUrl(null);
    return this.httpClient.put<void>(url, payload, {headers: headers});
  }

  /**
   * Use to perform POST request
   */
  protected doDelete<TPayload>(params: HttpParams): Observable<void> {

    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    const token = this.oidcSecurityService.getToken();
    if (token !== '') {
      const tokenValue = 'Bearer ' + token;
      headers = headers.set('Authorization', tokenValue);
    }

    let url = this.createMethodUrl(null);
    return this.httpClient.delete<void>(url, {headers: headers, params: params});
  }

  private createMethodUrl(action: string): string {

    let result = `${this.baseUrl}/${this.serviceName}`;
    if (action)
      result += '/' + action;

    return result;
  }
}

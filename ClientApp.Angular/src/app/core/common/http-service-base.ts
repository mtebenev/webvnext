import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {OidcSecurityService} from 'angular-auth-oidc-client';

import {Observable} from '@common/rxjs-imports';

export type AngularHttpParams = HttpParams | {
  [param: string]: string | string[];
};

export type AngularHttpHeaderes = HttpHeaders | {
  [header: string]: string | string[];
};

/**
 * Provides common functionality for HTTP services in application
 */
export abstract class HttpServiceBase {

  constructor(private oidcSecurityService: OidcSecurityService, private httpClient: HttpClient, private baseUrl: string, private serviceName: string) {
  }

  /**
   * Use to perform GET request
   */
  protected doGet<TResult>(action: string | null, params?: AngularHttpParams): Observable<TResult> {

    let headers = this.prepareRequestHeaders();
    let url = this.createMethodUrl(action);
    return this.httpClient.get<TResult>(url, {params, headers});
  }

  /**
   * Use to perform POST request
   */
  protected doPost<TPayload, TResult>(payload: TPayload): Observable<TResult> {

    let headers = this.prepareRequestHeaders();
    let url = this.createMethodUrl(null);
    return this.httpClient.post<TResult>(url, payload, {headers});
  }

  protected doPut<TPayload>(params?: {[index: string]: string}, payload?: TPayload): Observable<void> {

    let headers = this.prepareRequestHeaders();
    let url = this.createMethodUrl(null);
    return this.httpClient.put<void>(url, payload, {headers});
  }

  /**
   * Use to perform POST request
   */
  protected doDelete(params: HttpParams): Observable<void> {

    let headers = this.prepareRequestHeaders();
    let url = this.createMethodUrl(null);
    return this.httpClient.delete<void>(url, {headers, params});
  }

  private createMethodUrl(action: string | null): string {

    let result = `${this.baseUrl}/${this.serviceName}`;
    if (action)
      result += '/' + action;

    return result;
  }

  /**
   * Prepares headers for HTTP requests. Sets authentication token.
   */
  private prepareRequestHeaders(): AngularHttpHeaderes {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    const token = this.oidcSecurityService.getToken();
    if (token !== '') {
      const tokenValue = 'Bearer ' + token;
      headers = headers.set('Authorization', tokenValue);
    }

    return headers;
  }
}

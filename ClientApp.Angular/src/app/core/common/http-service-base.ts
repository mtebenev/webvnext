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

  private readonly _oidcSecurityService: OidcSecurityService;
  private readonly _httpClient: HttpClient;
  private readonly _baseUrl: string;
  private readonly _serviceName: string;

  constructor(oidcSecurityService: OidcSecurityService, httpClient: HttpClient, baseUrl: string, serviceName: string) {
    this._oidcSecurityService = oidcSecurityService;
    this._httpClient = httpClient;
    this._baseUrl = baseUrl;
    this._serviceName = serviceName;
  }

  /**
   * Use to perform GET request
   */
  protected doGet<TResult>(action: string | null, params?: AngularHttpParams): Observable<TResult> {

    let headers = this.prepareRequestHeaders();
    let url = this.createMethodUrl(action);
    return this._httpClient.get<TResult>(url, {params, headers});
  }

  /**
   * Use to perform POST request
   */
  protected doPost<TPayload, TResult>(payload: TPayload): Observable<TResult> {

    let headers = this.prepareRequestHeaders();
    let url = this.createMethodUrl(null);
    return this._httpClient.post<TResult>(url, payload, {headers});
  }

  /**
   * Use to perform PUT request
   */
  protected doPut<TPayload>(params?: {[index: string]: string}, payload?: TPayload): Observable<void> {

    let headers = this.prepareRequestHeaders();
    let url = this.createMethodUrl(null);
    return this._httpClient.put<void>(url, payload, {headers});
  }

  /**
   * Use to perform DELETE request
   */
  protected doDelete(params: HttpParams): Observable<void> {

    let headers = this.prepareRequestHeaders();
    let url = this.createMethodUrl(null);
    return this._httpClient.delete<void>(url, {headers, params});
  }

  private createMethodUrl(action: string | null): string {

    let result = `${this._baseUrl}/${this._serviceName}`;
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

    const token = this._oidcSecurityService.getToken();
    if (token !== '') {
      const tokenValue = 'Bearer ' + token;
      headers = headers.set('Authorization', tokenValue);
    }

    return headers;
  }
}

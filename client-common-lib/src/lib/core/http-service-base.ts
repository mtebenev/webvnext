import axios, {AxiosRequestConfig} from 'axios';
import {IAuthTokenProvider} from '../core/iauth-token-provider'

export type HttpRequestParams = {
  [param: string]: string | string[];
};

export type HttpRequestHeaderes = {
  [header: string]: string | string[];
};

/**
 * Provides common functionality for HTTP services in application
 */
export abstract class HttpServiceBase {

  private readonly _authTokenProvider: IAuthTokenProvider;
  private readonly _baseUrl: string;
  private readonly _serviceName: string;

  constructor(authTokenProvider: IAuthTokenProvider, baseUrl: string, serviceName: string) {

    this._authTokenProvider = authTokenProvider;
    this._baseUrl = baseUrl;
    this._serviceName = serviceName;
  }

  /**
   * Use to perform GET request
   */
  protected async doGet<TResult>(action: string | null, params?: HttpRequestParams): Promise<TResult> {

    let requestConfig = await this.prepareRequestConfig(params);
    let url = this.createMethodUrl(action);

    let response = await axios.get<TResult>(url, requestConfig);
    return response.data;
  }

  /**
   * Use to perform POST request
   */
  protected async doPost<TPayload, TResult>(payload: TPayload): Promise<TResult> {

    let requestConfig = await this.prepareRequestConfig(undefined, payload);
    let url = this.createMethodUrl(null);

    let response = await axios.post<TResult>(url, requestConfig);
    return response.data;
  }


  /**
   * Use to perform PUT request
   */
  protected async doPut<TPayload>(params?: {[index: string]: string}, payload?: TPayload): Promise<void> {

    let requestConfig = await this.prepareRequestConfig(params, payload);
    let url = this.createMethodUrl(null);

    await axios.put(url, null, requestConfig);
  }

  /**
   * Use to perform POST request
   */
  protected async doDelete(params: HttpRequestParams): Promise<void> {

    let requestConfig = await this.prepareRequestConfig(params);
    let url = this.createMethodUrl(null);

    await axios.delete(url, requestConfig);
  }

  private createMethodUrl(action: string | null): string {

    let result = `${this._baseUrl}/${this._serviceName}`;
    if(action)
      result += '/' + action;

    return result;
  }

  /**
   * Prepares headers for HTTP requests. Sets authentication token.
   */
  private async prepareRequestConfig(params?: HttpRequestParams, payload?: any): Promise<AxiosRequestConfig> {

    const accessToken = await this._authTokenProvider.getAccessToken();

    if(!accessToken)
      throw new Error('Unexpected: cannot get access token for the session');

    let config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + accessToken
      },
      params: params,
      data: payload
    };

    return config;
  }
}

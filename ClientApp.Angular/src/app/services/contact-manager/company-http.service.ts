import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {OidcSecurityService} from 'angular-auth-oidc-client';

import {HttpServiceBase} from '../../core/http-service-base';

export interface ICompanyDto {
  name: string;
  description: string;
}

/**
 * Company-related HTTP methods
 */
@Injectable()
export class CompanyHttpService extends HttpServiceBase {

  constructor(httpClient: HttpClient, oidcSecurityService: OidcSecurityService) {
    super(oidcSecurityService, httpClient, 'http://localhost:52563/api', 'companies');
  }

  /**
   * Load companies of the current user
   */
  public getCompanies(): Observable<ICompanyDto[]> {
    //throw new Error('before');

    return this.doGet();

    /*
    return this.doGet().map(x => {
      //console.error('some error occurred');
      throw new Error('error description');
    });
    */
  }
}

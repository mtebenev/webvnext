import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {OidcSecurityService} from 'angular-auth-oidc-client';

export interface ICompanyDto {
  name: string;
  description: string;
}

/**
 * Company-related HTTP methods
 */
@Injectable()
export class CompanyHttpService {

  constructor(private httpClient: HttpClient, private oidcSecurityService: OidcSecurityService) {
    alert('created company http server');
  }

  public getCompanies(): Observable<ICompanyDto[]> {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    const token = this.oidcSecurityService.getToken();
    if (token !== '') {
      const tokenValue = 'Bearer ' + token;
      headers = headers.set('Authorization', tokenValue);
    }
    alert(token);

    return this.httpClient.get<ICompanyDto[]>('http://localhost:52563/api/companies', {headers: headers});
  }
}

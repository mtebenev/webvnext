import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {OidcSecurityService} from 'angular-auth-oidc-client';

import {HttpServiceBase} from '../../core/http-service-base';

export interface ICompanyDto {
  companyId: number;
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
  public getCompanies(): Promise<ICompanyDto[]> {

    return this.doGet<ICompanyDto[]>(null).toPromise();
  }

  /**
   * Load specific company of the current user
   */
  public getCompany(companyId: number): Promise<ICompanyDto> {

    return this.doGet<ICompanyDto>(companyId.toString(), {companyId: companyId.toString()}).toPromise();
  }

  /**
   * Create a new company for the current user
   */
  public createCompany(companyDto: ICompanyDto): Promise<{}> {
    return this.doPost(companyDto).toPromise();
  }

  /**
   * Updates an existing company
   */
  public updateCompany(companyDto: ICompanyDto): Promise<void> {
    return this.doPut({companyId: companyDto.companyId.toString()}, companyDto).toPromise();
  }

  /**
   * Delete company of the current user
   */
  public deleteCompany(companyId: number): Promise<void> {

    let params = new HttpParams().set('companyId', companyId.toString());
    return this.doDelete(params).toPromise();
  }
}

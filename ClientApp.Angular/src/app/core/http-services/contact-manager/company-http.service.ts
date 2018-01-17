import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {OidcSecurityService} from 'angular-auth-oidc-client';

import {environment} from '@environments/environment';
import {HttpServiceBase} from '@common/http-service-base';
import {IPagedResultDto} from '@common/ipaged-result-dto';

export interface ICompanyDto {
  companyId: number;
  name: string | null;
  description: string | null;
}

export interface ICompanyQueryParamsDto {
  pageNumber: number;
  pageSize: number;
}

/**
 * Company-related HTTP methods
 */
@Injectable()
export class CompanyHttpService extends HttpServiceBase {

  constructor(httpClient: HttpClient, oidcSecurityService: OidcSecurityService) {
    super(oidcSecurityService, httpClient, environment.apiBaseUrl, 'companies');
  }

  /**
   * Load companies of the current user
   */
  public getCompanies(queryParams: ICompanyQueryParamsDto): Promise<IPagedResultDto<ICompanyDto>> {

    let stringifiedParams = {
      pageNumber: queryParams.pageNumber.toString(),
      pageSize: queryParams.pageSize.toString()
    };

    return this.doGet<IPagedResultDto<ICompanyDto>>(null, stringifiedParams).toPromise();
  }

  /**
   * Load specific company of the current user
   */
  public getCompany(companyId: number): Promise<ICompanyDto> {

    return this.doGet<ICompanyDto>(companyId.toString()).toPromise();
  }

  /**
   * Create a new company for the current user
   */
  public createCompany(companyDto: ICompanyDto): Promise<ICompanyDto> {
    return this.doPost<ICompanyDto, ICompanyDto>(companyDto).toPromise();
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

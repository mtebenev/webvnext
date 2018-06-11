import {Injectable} from '@angular/core';

import {OidcSecurityService} from 'angular-auth-oidc-client';
import {CompanyHttpService as CompanyHttpServiceCore, ICompanyQueryParamsDto, IPagedResultDto, ICompanyDto} from 'client-common-lib';

import {environment} from '@environments/environment';
import {AuthTokenProviderOidc} from '@common/auth-token-provider-oidc';

/**
 * Company-related HTTP methods (wraps CompanyHttpService from client-common-lib)
 */
@Injectable()
export class CompanyHttpService {

  private _httpService: CompanyHttpServiceCore;

  constructor(oidcSecurityService: OidcSecurityService) {

    const authTokenProvider = new AuthTokenProviderOidc(oidcSecurityService);
    this._httpService = new CompanyHttpServiceCore(authTokenProvider, environment.apiBaseUrl, 'companies')
  }

  /**
   * Load companies of the current user
   */
  public getCompanies(queryParams: ICompanyQueryParamsDto): Promise<IPagedResultDto<ICompanyDto>> {
    return this._httpService.getCompanies(queryParams);
  }

  /**
   * Load specific company of the current user
   */
  public getCompany(companyId: number): Promise<ICompanyDto> {
    return this._httpService.getCompany(companyId);
  }

  /**
   * Create a new company for the current user
   */
  public createCompany(companyDto: ICompanyDto): Promise<ICompanyDto> {
    return this._httpService.createCompany(companyDto);
  }

  /**
   * Updates an existing company
   */
  public updateCompany(companyDto: ICompanyDto): Promise<void> {
    return this._httpService.updateCompany(companyDto);
  }

  /**
   * Delete company of the current user
   */
  public deleteCompany(companyId: number): Promise<void> {
    return this._httpService.deleteCompany(companyId);
  }
}

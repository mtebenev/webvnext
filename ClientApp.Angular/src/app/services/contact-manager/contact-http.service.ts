import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {OidcSecurityService} from 'angular-auth-oidc-client';

import {environment} from '@environments/environment';
import {HttpServiceBase} from '@core/http-service-base';
import {IPagedResultDto} from '@core/ipaged-result-dto';

export interface IContactDto {
  contactId: number;
  firstName: string;
  lastName: string;
  companyId: number;
}

export interface IContactQueryParamsDto {
  pageNumber: number;
  pageSize: number;
}

/**
 * Contact-related HTTP methods
 */
@Injectable()
export class ContactHttpService extends HttpServiceBase {

  constructor(httpClient: HttpClient, oidcSecurityService: OidcSecurityService) {
    super(oidcSecurityService, httpClient, environment.apiBaseUrl, 'contacts');
  }

  /**
   * Load contacts of the current user
   */
  public getContacts(queryParams: IContactQueryParamsDto): Promise<IPagedResultDto<IContactDto>> {

    let stringifiedParams = {
      pageNumber: queryParams.pageNumber.toString(),
      pageSize: queryParams.pageSize.toString()
    };

    let httpParams = new HttpParams({fromObject: stringifiedParams});
    return this.doGet<IPagedResultDto<IContactDto>>(null, stringifiedParams).toPromise();
  }

  /**
   * Load specific contact of the current user
   */
  public getContact(contactId: number): Promise<IContactDto> {

    return this.doGet<IContactDto>(contactId.toString()).toPromise();
  }

  /**
   * Create a new contact for the current user
   */
  public createContact(contactDto: IContactDto): Promise<{}> {
    return this.doPost(contactDto).toPromise();
  }

  /**
   * Updates an existing contact
   */
  public updateContact(contactDto: IContactDto): Promise<void> {
    return this.doPut({contactId: contactDto.contactId.toString()}, contactDto).toPromise();
  }

  /**
   * Delete contact of the current user
   */
  public deleteContact(contactId: number): Promise<void> {

    let params = new HttpParams().set('contactId', contactId.toString());
    return this.doDelete(params).toPromise();
  }
}

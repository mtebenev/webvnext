import {Injectable} from '@angular/core';

import {OidcSecurityService} from 'angular-auth-oidc-client';
import {ContactHttpService as ContactHttpServiceCore, IContactDto, IPagedResultDto, IContactQueryParamsDto} from 'client-common-lib';

import {environment} from '@environments/environment';
import {AuthTokenProviderOidc} from '@common/auth-token-provider-oidc';

/**
 * Contact-related HTTP methods
 */
@Injectable()
export class ContactHttpService {

  private _httpService: ContactHttpServiceCore;

  constructor(oidcSecurityService: OidcSecurityService) {

    const authTokenProvider = new AuthTokenProviderOidc(oidcSecurityService);
    this._httpService = new ContactHttpServiceCore(authTokenProvider, environment.apiBaseUrl);
  }

  /**
   * Load contacts of the current user
   */
  public getContacts(queryParams: IContactQueryParamsDto): Promise<IPagedResultDto<IContactDto>> {
    return this._httpService.getContacts(queryParams);
  }

  /**
   * Load specific contact of the current user
   */
  public getContact(contactId: number): Promise<IContactDto> {
    return this._httpService.getContact(contactId);
  }

  /**
   * Create a new contact for the current user
   */
  public createContact(contactDto: IContactDto): Promise<IContactDto> {
    return this._httpService.createContact(contactDto);
  }

  /**
   * Updates an existing contact
   */
  public updateContact(contactDto: IContactDto): Promise<void> {
    return this._httpService.updateContact(contactDto);
  }

  /**
   * Delete contact of the current user
   */
  public deleteContact(contactId: number): Promise<void> {
    return this._httpService.deleteContact(contactId);
  }
}

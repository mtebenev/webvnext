import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {OidcSecurityService} from 'angular-auth-oidc-client';

import {HttpServiceBase} from '@core/http-service-base';

export interface IContactDto {
  contactId: number;
  firstName: string;
  lastName: string;
}

/**
 * Contact-related HTTP methods
 */
@Injectable()
export class ContactHttpService extends HttpServiceBase {

  constructor(httpClient: HttpClient, oidcSecurityService: OidcSecurityService) {
    super(oidcSecurityService, httpClient, 'http://localhost:52563/api', 'contacts');
  }

  /**
   * Load contacts of the current user
   */
  public getContacts(): Promise<IContactDto[]> {

    return this.doGet<IContactDto[]>(null).toPromise();
  }

  /**
   * Create a new contact for the current user
   */
  public createContact(contactDto: IContactDto): Promise<{}> {
    return this.doPost(contactDto).toPromise();
  }
}

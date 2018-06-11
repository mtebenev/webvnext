import {HttpServiceBase} from '../core/http-service-base';
import {IContactQueryParamsDto} from '../dto/icontact-query-params-dto';
import {IPagedResultDto} from '../dto/ipaged-result-dto';
import {IContactDto} from '../dto/icontact-dto';
import {IAuthTokenProvider} from '../core/iauth-token-provider';

/**
 * Contact-related HTTP methods
 */

export class ContactHttpService extends HttpServiceBase {

  constructor(authTokenProvider: IAuthTokenProvider, baseUrl: string) {
    super(authTokenProvider, baseUrl, 'contacts')
  }

  /**
   * Load contacts of the current user
   */
  public getContacts(queryParams: IContactQueryParamsDto): Promise<IPagedResultDto<IContactDto>> {

    let stringifiedParams: {[param: string]: string} = {
      pageNumber: queryParams.pageNumber.toString(),
      pageSize: queryParams.pageSize.toString()
    };

    if(queryParams.filterText)
      stringifiedParams.filterText = queryParams.filterText;

    return this.doGet<IPagedResultDto<IContactDto>>(null, stringifiedParams);
  }

  /**
   * Load specific contact of the current user
   */
  public getContact(contactId: number): Promise<IContactDto> {

    return this.doGet<IContactDto>(contactId.toString());
  }

  /**
   * Create a new contact for the current user
   */
  public createContact(contactDto: IContactDto): Promise<IContactDto> {
    return this.doPost<IContactDto, IContactDto>(contactDto);
  }

  /**
   * Updates an existing contact
   */
  public updateContact(contactDto: IContactDto): Promise<void> {
    return this.doPut({contactId: contactDto.contactId.toString()}, contactDto);
  }

  /**
   * Delete contact of the current user
   */
  public deleteContact(contactId: number): Promise<void> {
    return this.doDelete({contactId: contactId.toString()});
  }
}

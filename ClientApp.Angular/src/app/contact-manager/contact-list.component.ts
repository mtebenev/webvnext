import {Component, OnInit} from '@angular/core';

import {ContactHttpService, IContactDto, IContactQueryParamsDto} from '@services/contact-manager/contact-http.service';
import {IPagedResultDto} from '@core/ipaged-result-dto';

/**
 * Displays contacts of current user
 */
@Component({
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {

  private _contacts: IPagedResultDto<IContactDto>;

  constructor(private contactHttpService: ContactHttpService) {
  }

  /**
   * Bound companies
   */
  public get contacts(): IPagedResultDto<IContactDto> {
    return this._contacts;
  }

  public ngOnInit(): void {
    this.loadContacts();
  }

  public async handleDeleteContactClick(contactId: number): Promise<void> {

    if (confirm('Are you sure to delete the contact?')) {
      await this.contactHttpService.deleteContact(contactId);
    }
  }

  private async loadContacts(): Promise<void> {

    this._contacts = null;
    let queryParams: IContactQueryParamsDto = {
      pageNumber: 0,
      pageSize: 10
    };

    this._contacts = await this.contactHttpService.getContacts(queryParams);
  }
}

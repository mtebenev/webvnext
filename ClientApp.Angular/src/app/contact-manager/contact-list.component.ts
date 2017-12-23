import {Component, OnInit} from '@angular/core';

import {PageEvent} from '@angular/material';

import {ContactHttpService, IContactDto, IContactQueryParamsDto} from '@services/contact-manager/contact-http.service';
import {IPagedResultDto} from '@core/ipaged-result-dto';

/**
 * Displays contacts of current user
 */
@Component({
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {

  private currentPage: number;
  private _pageSize: number;
  private _contacts: IPagedResultDto<IContactDto>;

  constructor(private contactHttpService: ContactHttpService) {

    this.currentPage = 0;
    this._pageSize = 10;
  }

  /**
   * OnInit
   */
  public ngOnInit(): void {
    this.loadContacts();
  }

  /**
   * Bound contacts
   */
  public get contacts(): IPagedResultDto<IContactDto> {
    return this._contacts;
  }

  /**
   * Bound page size
   */
  public get pageSize(): number {
    return this._pageSize;
  }

  /**
   * Invoked when user clicks DELETE button on a contact
   */
  public async handleDeleteContactClick(contactId: number): Promise<void> {

    if (confirm('Are you sure to delete the contact?')) {
      await this.contactHttpService.deleteContact(contactId);
    }
  }

  /**
   * Invoked when user changes current page in pager control
   */
  public handlePageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this._pageSize = event.pageSize;

    this.loadContacts();
  }

  private async loadContacts(): Promise<void> {

    let queryParams: IContactQueryParamsDto = {
      pageNumber: this.currentPage,
      pageSize: this._pageSize
    };

    this._contacts = await this.contactHttpService.getContacts(queryParams);
  }
}

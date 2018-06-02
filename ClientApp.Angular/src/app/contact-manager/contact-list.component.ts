import {Component, OnInit} from '@angular/core';

import {PageEvent} from '@angular/material';

import {ContactHttpService, IContactDto, IContactQueryParamsDto} from '@http-services/contact-manager/contact-http.service';
import {IPagedResultDto} from '@common/ipaged-result-dto';

/**
 * Displays contacts of current user
 */
@Component({
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {

  private currentPage: number;
  private _pageSize: number;
  private _filterText?: string;
  private _contacts?: IPagedResultDto<IContactDto>;

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
  public get contacts(): IPagedResultDto<IContactDto> | undefined {
    return this._contacts;
  }

  /**
   * Bound page size
   */
  public get pageSize(): number {
    return this._pageSize;
  }

  /**
   * Invoked when user changes current page in pager control
   */
  public handlePageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this._pageSize = event.pageSize;

    this.loadContacts();
  }

  /**
   * Invoked when user changes filter
   */
  public handleFilterTextChanged(filterText: string): void {
    this._filterText = filterText;
    this.loadContacts();
  }

  private async loadContacts(): Promise<void> {

    let queryParams: IContactQueryParamsDto = {
      pageNumber: this.currentPage,
      pageSize: this._pageSize,
      filterText: this._filterText
    };

    this._contacts = await this.contactHttpService.getContacts(queryParams);
  }
}

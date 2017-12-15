import {Component, OnInit} from '@angular/core';

import {ContactHttpService, IContactDto} from '@services/contact-manager/contact-http.service';

/**
 * Displays contacts of current user
 */
@Component({
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit {

  private _contacts: IContactDto[];

  constructor(private contactHttpService: ContactHttpService) {
  }

  /**
   * Bound companies
   */
  public get contacts(): IContactDto[] {
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

    this._contacts = [];
    this._contacts = await this.contactHttpService.getContacts();
  }
}

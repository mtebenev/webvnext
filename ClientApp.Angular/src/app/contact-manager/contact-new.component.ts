import {Component, OnInit} from '@angular/core';

import {ContactHttpService, IContactDto} from '@services/contact-manager/contact-http.service';

@Component({
  templateUrl: './contact-new.component.html'
})
export class ContactNewComponent {

  private _contact: IContactDto;

  constructor(private contactHttpService: ContactHttpService) {

    this._contact = {
      contactId: 0,
      firstName: null,
      lastName: null
    };
  }

  /**
   * Bound contact
   */
  public get contact(): IContactDto {
    return this._contact;
  }

  public async handleCreateClick(): Promise<void> {

    await this.contactHttpService.createContact(this._contact);
  }
}

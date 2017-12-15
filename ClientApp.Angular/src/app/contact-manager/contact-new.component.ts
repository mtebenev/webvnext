import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {ContactHttpService, IContactDto} from '@services/contact-manager/contact-http.service';
import {AppNavigationService} from '@services/app-navigation.service';

@Component({
  templateUrl: './contact-new.component.html'
})
export class ContactNewComponent {

  private _contact: IContactDto;

  constructor(private contactHttpService: ContactHttpService, private appNavigationService: AppNavigationService) {

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

  /**
   * Invoked when user submits the form
   */
  public async handleFormSubmit(form: FormGroup): Promise<void> {

    if (form.valid) {
      await this.contactHttpService.createContact(this._contact);
      this.appNavigationService.goToContactList();
    }
  }
}

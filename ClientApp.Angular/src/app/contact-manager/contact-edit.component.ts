import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';

import {ContactHttpService, IContactDto} from '@http-services/contact-manager/contact-http.service';
import {AppNavigationService} from '@app-services/app-navigation.service';

@Component({
  templateUrl: './contact-edit.component.html'
})

export class ContactEditComponent implements OnInit {

  private _contact: IContactDto;

  constructor(private activatedRoute: ActivatedRoute, private contactHttpService: ContactHttpService, private appNavigationService: AppNavigationService) {
  }

  /**
   * Bound contact
   */
  public get contact(): IContactDto {
    return this._contact;
  }

  /**
   * OnInit
   */
  public ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        this.loadContact(params.contactId);
      });
  }

  /**
   * Invoked when user submits the form
   */
  public async handleFormSubmit(form: FormGroup): Promise<void> {

    if (form.valid) {
      await this.contactHttpService.updateContact(this._contact);
      this.appNavigationService.goToContactList();
    }
  }

  /**
   * Invoked when user clicks DELETE button on a contact
   */
  public async handleDeleteClick(contactId: number): Promise<void> {

    if (confirm('Are you sure to delete the contact?')) {
      await this.contactHttpService.deleteContact(contactId);
    }
  }

  private async loadContact(contactId: number): Promise<void> {

    this._contact = await this.contactHttpService.getContact(contactId);
  }
}

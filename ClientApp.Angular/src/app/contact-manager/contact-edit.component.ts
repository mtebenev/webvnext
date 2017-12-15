import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';

import {ContactHttpService, IContactDto} from '@services/contact-manager/contact-http.service';
import {AppNavigationService} from '@services/app-navigation.service';

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

  private async loadContact(contactId: number): Promise<void> {

    this._contact = await this.contactHttpService.getContact(contactId);
  }
}

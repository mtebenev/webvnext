import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {AppNavigationService} from '@app-services/app-navigation.service';
import {ContactHttpService, IContactDto} from '@http-services/contact-manager/contact-http.service';
import {ICompanyDto, CompanyHttpService} from '@http-services/contact-manager/company-http.service';

@Component({
  templateUrl: './contact-new.component.html'
})
export class ContactNewComponent {

  private _contact: IContactDto;
  private _companies: ICompanyDto[];

  constructor(private contactHttpService: ContactHttpService, companyHttpService: CompanyHttpService, private appNavigationService: AppNavigationService) {

    this._contact = {
      contactId: 0,
      firstName: null,
      lastName: null,
      companyId: null
    };
  }

  /**
   * Bound contact
   */
  public get contact(): IContactDto {
    return this._contact;
  }

  /**
   * Bound companies
   */
  public get companies(): ICompanyDto[] {
    return this._companies;
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

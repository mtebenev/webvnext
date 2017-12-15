import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {CompanyHttpService, ICompanyDto} from '@services/contact-manager/company-http.service';
import {AppNavigationService} from '@services/app-navigation.service';

@Component({
  templateUrl: './company-new.component.html'
})
export class CompanyNewComponent {

  private _company: ICompanyDto;

  constructor(private companyHttpService: CompanyHttpService, private appNavigationService: AppNavigationService) {
    this._company = {
      companyId: 0,
      name: null,
      description: null
    };
  }

  /**
   * Bound company
   */
  public get company(): ICompanyDto {
    return this._company;
  }

  /**
   * Invoked when user submits the form
   */
  public async handleFormSubmit(form: FormGroup): Promise<void> {

    if (form.valid) {
      await this.companyHttpService.createCompany(this._company);
      this.appNavigationService.goToCompanyList();
    }
  }
}

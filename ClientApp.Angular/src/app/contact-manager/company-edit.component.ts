import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';

import {CompanyHttpService, ICompanyDto} from '@services/contact-manager/company-http.service';
import {AppNavigationService} from '@services/app-navigation.service';

@Component({
  templateUrl: './company-edit.component.html'
})

export class CompanyEditComponent implements OnInit {

  private _company: ICompanyDto;

  constructor(private activatedRoute: ActivatedRoute, private companyHttpService: CompanyHttpService, private appNavigationService: AppNavigationService) {
  }

  public get company(): ICompanyDto {
    return this._company;
  }

  /**
   * OnInit
   */
  public ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        if (params.companyId) {
          this.loadCompany(params.companyId);
        }
      });
  }

  /**
   * Invoked when user submits the form
   */
  public async handleFormSubmit(form: FormGroup): Promise<void> {

    if (form.valid) {
      await this.companyHttpService.updateCompany(this._company);
      this.appNavigationService.goToCompanyList();
    }
  }

  /**
   * Invoked when user clicks DELETE button on a company
   */
  public async handleDeleteClick(): Promise<void> {

    if (confirm('Are you sure to delete the company')) {
      await this.companyHttpService.deleteCompany(this._company.companyId);
    }
  }

  private async loadCompany(companyId: number): Promise<void> {

    this._company = await this.companyHttpService.getCompany(companyId);
  }
}

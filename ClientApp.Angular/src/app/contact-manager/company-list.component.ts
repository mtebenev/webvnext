import {Component, OnInit, Injectable} from '@angular/core';

import {CompanyHttpService, ICompanyDto} from '../services/contact-manager/company-http.service';

/**
 * Displays companies of current user
 */
@Component({
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent {

  private _companies: ICompanyDto[];

  constructor(private companyHttpService: CompanyHttpService) {
  }

  /**
   * Bound companies
   */
  public get companies(): ICompanyDto[] {
    return this._companies;
  }

  public handleLoadCompaniesClick(): void {

    this.companyHttpService.getCompanies()
      .subscribe(data => {
        this._companies = data;
      }, error => {
        alert('error during loading companies');
      });
  }

}

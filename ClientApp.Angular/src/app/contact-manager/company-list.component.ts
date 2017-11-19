import {Component, OnInit, Injectable} from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/first';

import {CompanyHttpService, ICompanyDto} from '../services/contact-manager/company-http.service';

/**
 * Displays companies of current user
 */
@Component({
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent {

  private _companies: ICompanyDto[];
  private _companyCount: number;

  constructor(private companyHttpService: CompanyHttpService) {
    this._companyCount = -1;
  }

  /**
   * Bound companies
   */
  public get companies(): ICompanyDto[] {
    return this._companies;
  }

  public get companyCount(): number {
    return this._companyCount;
  }

  public async handleLoadCompaniesClick(): Promise<void> {

    this._companyCount = -1;
    this._companies = [];

    this._companies = await this.companyHttpService.getCompanies();
    this._companyCount = this._companies.length;
  }

  public async handleDeleteCompanyClick(companyId: number): Promise<void> {

    if (confirm('Are you sure to delete the company')) {
      await this.companyHttpService.deleteCompany(companyId);
    }
  }

}

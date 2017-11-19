import {Component, OnInit} from '@angular/core';

import {CompanyHttpService, ICompanyDto} from '@services/contact-manager/company-http.service';

/**
 * Displays companies of current user
 */
@Component({
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {

  private _companies: ICompanyDto[];

  constructor(private companyHttpService: CompanyHttpService) {
  }

  /**
   * Bound companies
   */
  public get companies(): ICompanyDto[] {
    return this._companies;
  }

  public ngOnInit(): void {
    this.loadCompanies();
  }

  public async handleDeleteCompanyClick(companyId: number): Promise<void> {

    if (confirm('Are you sure to delete the company')) {
      await this.companyHttpService.deleteCompany(companyId);
    }
  }

  private async loadCompanies(): Promise<void> {

    this._companies = [];
    this._companies = await this.companyHttpService.getCompanies();
  }
}

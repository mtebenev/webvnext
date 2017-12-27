import {Component, OnInit} from '@angular/core';

import {PageEvent} from '@angular/material';

import {CompanyHttpService, ICompanyDto, ICompanyQueryParamsDto} from '@services/contact-manager/company-http.service';
import {IPagedResultDto} from '@core/ipaged-result-dto';

/**
 * Displays companies of current user
 */
@Component({
  selector: 'company-list',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {

  private currentPage: number;
  private _pageSize: number;
  private _companies: IPagedResultDto<ICompanyDto>;

  constructor(private companyHttpService: CompanyHttpService) {
    this.currentPage = 0;
    this._pageSize = 10;
  }

  /**
   * OnInit
   */
  public ngOnInit(): void {
    this.loadCompanies();
  }

  /**
   * Bound companies
   */
  public get companies(): IPagedResultDto<ICompanyDto> {
    return this._companies;
  }

  /**
   * Bound page size
   */
  public get pageSize(): number {
    return this._pageSize;
  }

  /**
   * Invoked when user clicks DELETE button on a company
   */
  public async handleDeleteCompanyClick(companyId: number): Promise<void> {

    if (confirm('Are you sure to delete the company')) {
      await this.companyHttpService.deleteCompany(companyId);
    }
  }

  /**
   * Invoked when user changes current page in pager control
   */
  public handlePageChange(event: PageEvent): void {

    this.currentPage = event.pageIndex;
    this._pageSize = event.pageSize;

    this.loadCompanies();
  }

  private async loadCompanies(): Promise<void> {

    let queryParams: ICompanyQueryParamsDto = {
      pageNumber: this.currentPage,
      pageSize: this._pageSize
    };

    this._companies = await this.companyHttpService.getCompanies(queryParams);
  }
}

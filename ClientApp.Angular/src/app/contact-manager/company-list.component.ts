import {Component, OnInit} from '@angular/core';

import {PageEvent} from '@angular/material';

import {ICompanyDto, ICompanyQueryParamsDto} from 'client-common-lib';
import {CompanyHttpService} from '@http-services/contact-manager/company-http.service';
import {IPagedResultDto} from '@common/ipaged-result-dto';

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
  private _filterText?: string;
  private _companies?: IPagedResultDto<ICompanyDto>;

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
  public get companies(): IPagedResultDto<ICompanyDto> | undefined {
    return this._companies;
  }

  /**
   * Bound page size
   */
  public get pageSize(): number {
    return this._pageSize;
  }

  /**
   * Invoked when user changes current page in pager control
   */
  public handlePageChange(event: PageEvent): void {

    this.currentPage = event.pageIndex;
    this._pageSize = event.pageSize;

    this.loadCompanies();
  }

  /**
   * Invoked when user changes filter
   */
  public handleFilterTextChanged(filterText: string): void {
    this._filterText = filterText;
    this.loadCompanies();
  }

  private async loadCompanies(): Promise<void> {

    let queryParams: ICompanyQueryParamsDto = {
      pageNumber: this.currentPage,
      pageSize: this._pageSize,
      filterText: this._filterText
    };

    this._companies = await this.companyHttpService.getCompanies(queryParams);
  }
}

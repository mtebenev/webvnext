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

  public /* async*/ handleLoadCompaniesClick(): void /* Promise<void>*/ {

    this._companyCount = -1;

    // Plain observable version
    let observable = this.companyHttpService.getCompanies();

    observable
      .subscribe(data => {
        alert('got one');
        this._companies = data;
        this._companyCount = data.length;
      }, null, () => {
        alert('on complete 1');
      });

    observable
      .subscribe(data => {
        alert('got two');
        this._companies = data;
        this._companyCount = data.length;
      });

    // Plain promise
    /*
    this.companyHttpService.getCompanies().toPromise()
      .then(data => {
        this._companies = data;
        this._companyCount = data.length;
      })
      .catch(error => {
        alert('error during loading companies');
        console.error('error during loading companies', error);
      });
      */

    // Promise awaitable
    /*
    try {
      this._companies = await this.companyHttpService.getCompanies().toPromise();
      this._companyCount = this._companies.length;
    } catch (error) {
      alert('caught!');
      console.error(error);
    }
    */


  }

}

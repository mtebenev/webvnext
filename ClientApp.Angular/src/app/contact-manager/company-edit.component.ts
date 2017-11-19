import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {CompanyHttpService, ICompanyDto} from '@services/contact-manager/company-http.service';

@Component({
  templateUrl: './company-edit.component.html'
})

export class CompanyEditComponent implements OnInit {

  private _company: ICompanyDto;

  constructor(private activatedRoute: ActivatedRoute, private companyHttpService: CompanyHttpService) {
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
        this.loadCompany(params.companyId);
      });
  }

  public async handleUpdateClick(): Promise<void> {

    await this.companyHttpService.updateCompany(this._company);
  }

  private async loadCompany(companyId: number): Promise<void> {

    this._company = await this.companyHttpService.getCompany(companyId);
  }
}

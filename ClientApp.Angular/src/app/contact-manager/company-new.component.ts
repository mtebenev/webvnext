import {Component, OnInit} from '@angular/core';

import {CompanyHttpService, ICompanyDto} from '@services/contact-manager/company-http.service';

@Component({
  templateUrl: './company-new.component.html'
})
export class CompanyNewComponent {

  public name: string;
  public description: string;

  constructor(private companyHttpService: CompanyHttpService) {
  }

  public async handleCreateClick(): Promise<void> {

    let companyDto: ICompanyDto = {
      companyId: 0,
      name: this.name,
      description: this.description
    };

    await this.companyHttpService.createCompany(companyDto);
  }
}

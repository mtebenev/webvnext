import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';

import {CompanyHttpService, ICompanyDto} from '@http-services/contact-manager/company-http.service';
import {AppNavigationService, ConfirmationUi} from '@app-services/index';

enum ViewMode {
  None = 'none',
  View = 'view',
  Edit = 'edit',
  New = 'new'
}

@Component({
  templateUrl: './company-details.component.html'
})
export class CompanyDetailsComponent implements OnInit {

  private _company: ICompanyDto;
  private _activatedRoute: ActivatedRoute;
  private _companyHttpService: CompanyHttpService;
  private _appNavigationService: AppNavigationService;
  private _viewMode: ViewMode;
  private _confirmationUi: ConfirmationUi;

  constructor(activatedRoute: ActivatedRoute, companyHttpService: CompanyHttpService, appNavigationService: AppNavigationService, confirmationUi: ConfirmationUi) {

    this._activatedRoute = activatedRoute;
    this._companyHttpService = companyHttpService;
    this._appNavigationService = appNavigationService;
    this._viewMode = ViewMode.None;
    this._confirmationUi = confirmationUi;
  }

  public get viewMode(): ViewMode {
    return this._viewMode;
  }

  public get company(): ICompanyDto {
    return this._company;
  }

  /**
   * OnInit
   */
  public ngOnInit() {

    this._activatedRoute.url
      .subscribe(url => {

        let routeSnapshot = this._activatedRoute.snapshot;

        let companyId = routeSnapshot.params.companyId;
        let lastUrlSegment = routeSnapshot.url.length > 0
          ? routeSnapshot.url[routeSnapshot.url.length - 1]
          : null;

        if(lastUrlSegment && lastUrlSegment.path === 'new') {
          this._viewMode = ViewMode.New;
          this._company = {companyId: 0, name: null, description: null};
        } else if(lastUrlSegment && lastUrlSegment.path === 'edit')
          this._viewMode = ViewMode.Edit;
        else if(companyId)
          this._viewMode = ViewMode.View;

        if(companyId)
          this.loadCompany(companyId);

      });
  }

  /**
   * Invoked when user clicks EDIT button on the company
   */
  public async handleEditClick(): Promise<void> {
    this._appNavigationService.goToCompanyEdit(this._company.companyId);
  }

  /**
   * Invoked when user submits the form
   */
  public async handleFormSubmit(form: FormGroup): Promise<void> {

    if(form.valid) {

      let companyId = this._company.companyId;

      if(this._viewMode === ViewMode.Edit)
        await this._companyHttpService.updateCompany(this._company);
      else if(this._viewMode === ViewMode.New) {
        let newCompany = await this._companyHttpService.createCompany(this._company);
        companyId = newCompany.companyId;
      }

      this._appNavigationService.goToCompanyView(companyId);
    }
  }

  /**
   * Invoked when user clicks DELETE button on a company
   */
  public async handleDeleteClick(): Promise<void> {

    let isConfirmed = await this._confirmationUi.confirm('CONTACT_MANAGER.COMPANY_DETAILS.MSG_DELETE_COMPANY');
    if(isConfirmed) {
      await this._companyHttpService.deleteCompany(this._company.companyId);
      this._appNavigationService.goToCompanyList();
    }
  }

  private async loadCompany(companyId: number): Promise<void> {
    this._company = await this._companyHttpService.getCompany(companyId);
  }
}

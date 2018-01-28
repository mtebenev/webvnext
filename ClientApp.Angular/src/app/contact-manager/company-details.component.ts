import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {FormGroup} from '@angular/forms';

import {CompanyHttpService, ICompanyDto} from '@http-services/contact-manager/company-http.service';
import {AppNavigationService, ConfirmationUi} from '@app-services/index';
import {EntityDetailsComponentbase, ViewMode} from './entity-details-component-base';

@Component({
  templateUrl: './company-details.component.html'
})
export class CompanyDetailsComponent extends EntityDetailsComponentbase implements OnInit {

  private _company: ICompanyDto;
  private _companyHttpService: CompanyHttpService;
  private _appNavigationService: AppNavigationService;
  private _confirmationUi: ConfirmationUi;

  constructor(activatedRoute: ActivatedRoute, companyHttpService: CompanyHttpService, appNavigationService: AppNavigationService, confirmationUi: ConfirmationUi) {
    super(activatedRoute);

    this._companyHttpService = companyHttpService;
    this._appNavigationService = appNavigationService;
    this._confirmationUi = confirmationUi;
  }

  public get company(): ICompanyDto {
    return this._company;
  }

  /**
   * OnInit
   */
  public ngOnInit() {
    this.onInit();
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

      if(this.viewMode === ViewMode.Edit)
        await this._companyHttpService.updateCompany(this._company);
      else if(this.viewMode === ViewMode.New) {
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

  /**
   * Override
   */
  protected isEntityIdInRoute(routeSnapshot: ActivatedRouteSnapshot): boolean {
    return routeSnapshot.params.companyId ? true : false;
  }

  /**
   * Must be overridden in derived class and create new instance of the entity whe
   */
  protected async onSwitchMode(viewMode: ViewMode, routeSnapshot: ActivatedRouteSnapshot): Promise<void> {

    let companyId = routeSnapshot.params.companyId;
    if(!companyId && (viewMode === ViewMode.Edit || viewMode === ViewMode.View))
      throw new Error('Unexpected: cannot find entity ID on route');

    if(viewMode === ViewMode.View || viewMode === ViewMode.Edit) {
      this._company = await this._companyHttpService.getCompany(companyId);
    } else {
      this._company = {companyId: 0, name: null, description: null};
    }
  }
}

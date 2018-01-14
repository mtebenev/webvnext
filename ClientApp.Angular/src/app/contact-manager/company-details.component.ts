import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

import {CompanyHttpService, ICompanyDto} from '@http-services/contact-manager/company-http.service';
import {AppNavigationService} from '@app-services/app-navigation.service';

enum ViewMode {
  'none',
  'view',
  'edit',
  'new'
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

  constructor(activatedRoute: ActivatedRoute, companyHttpService: CompanyHttpService, appNavigationService: AppNavigationService) {

    this._activatedRoute = activatedRoute;
    this._companyHttpService = companyHttpService;
    this._appNavigationService = appNavigationService;
    this._company = null;
    this._viewMode = ViewMode.none;

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
  public ngOnInit(): void {

    this._activatedRoute.url
      .subscribe(url => {

        let routeSnapshot = this._activatedRoute.snapshot;

        let companyId = routeSnapshot.params.companyId;
        let lastUrlSegment = routeSnapshot.url.length > 0
          ? routeSnapshot.url[routeSnapshot.url.length - 1]
          : null;

        if(lastUrlSegment.path === 'new') {
          this._viewMode = ViewMode.new;
          this._company = {companyId: 0, name: null, description: null};
        } else if(lastUrlSegment.path === 'edit')
          this._viewMode = ViewMode.edit;
        else if(companyId)
          this._viewMode = ViewMode.view;

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

  private async loadCompany(companyId: number): Promise<void> {
    this._company = await this._companyHttpService.getCompany(companyId);
  }
}

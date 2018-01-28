import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl, NgForm, FormGroupDirective} from '@angular/forms';

import {ErrorStateMatcher} from '@angular/material';

import {ContactHttpService, IContactDto} from '@http-services/contact-manager/contact-http.service';
import {CompanyHttpService, ICompanyDto, ICompanyQueryParamsDto} from '@http-services/contact-manager/company-http.service';
import {AppNavigationService, ConfirmationUi} from '@app-services/index';

enum ViewMode {
  None = 'none',
  View = 'view',
  Edit = 'edit',
  New = 'new'
}

/**
 * Material-specific: check that input for related company is an object. Otherwise (if user types company names not selecting from list
 * put the control in error state)
 */
class CompanySelectStateMatcher extends ErrorStateMatcher {
  public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {

    let result = false;
    if(control) {
      let companySelectInput: FormControl = control;
      result = typeof companySelectInput.value === 'string';
    }

    return result;
  }
}

@Component({
  templateUrl: './contact-details.component.html'
})
export class ContactDetailsComponent implements OnInit {

  private _contact: IContactDto;
  private readonly _activatedRoute: ActivatedRoute;
  private readonly _contactHttpService: ContactHttpService;
  private readonly _companyHttpServie: CompanyHttpService;
  private readonly _appNavigationService: AppNavigationService;
  private _viewMode: ViewMode;
  private readonly _confirmationUi: ConfirmationUi;

  private _companies: ICompanyDto[]; // For selecting related companies
  private _selectedCompany: ICompanyDto | string;
  private readonly _companySelectStateMatcher: CompanySelectStateMatcher;

  constructor(activatedRoute: ActivatedRoute, contactHttpService: ContactHttpService, companyHttpService: CompanyHttpService,
    appNavigationService: AppNavigationService, confirmationUi: ConfirmationUi) {

    this._activatedRoute = activatedRoute;
    this._contactHttpService = contactHttpService;
    this._companyHttpServie = companyHttpService;
    this._appNavigationService = appNavigationService;
    this._viewMode = ViewMode.None;
    this._confirmationUi = confirmationUi;
    this._companySelectStateMatcher = new CompanySelectStateMatcher();
  }

  /**
   * Bound view mode
   */
  public get viewMode(): ViewMode {
    return this._viewMode;
  }

  /**
   * Bound contact
   */
  public get contact(): IContactDto {
    return this._contact;
  }

  /**
   * Bound related companies
   */
  public get companies(): ICompanyDto[] {
    return this._companies;
  }

  /**
   * Bound company selection
   */
  public get selectedCompany(): ICompanyDto | string {
    return this._selectedCompany;
  }
  public set selectedCompany(value: ICompanyDto | string) {
    this._selectedCompany = value;

    if(typeof value !== 'string')
      this._contact.companyId = value.companyId;
  }

  /**
   * Bound company selection validator
   */
  public get companySelectStateMatcher(): CompanySelectStateMatcher {
    return this._companySelectStateMatcher;
  }

  /**
   * OnInit
   */
  public ngOnInit() {

    this._activatedRoute.url
      .subscribe(url => {

        let routeSnapshot = this._activatedRoute.snapshot;

        let contactId = routeSnapshot.params.contactId;
        let lastUrlSegment = routeSnapshot.url.length > 0
          ? routeSnapshot.url[routeSnapshot.url.length - 1]
          : null;

        if(lastUrlSegment && lastUrlSegment.path === 'new') {
          this._viewMode = ViewMode.New;
          this._contact = {contactId: 0, firstName: null, lastName: null, companyId: 0};
        } else if(lastUrlSegment && lastUrlSegment.path === 'edit')
          this._viewMode = ViewMode.Edit;
        else if(contactId)
          this._viewMode = ViewMode.View;

        if(contactId)
          this.loadContact(contactId);
      });
  }

  /**
   * Invoked when user changes filter in companies autocomplete
   */
  public async handleCompanyFilterChange(value: string): Promise<void> {

    let queryParams: ICompanyQueryParamsDto = {
      pageNumber: 0,
      pageSize: 10,
      filterText: value
    };

    let pagedResult = await this._companyHttpServie.getCompanies(queryParams);
    this._companies = pagedResult.rows;
  }

  /**
   * Used to display company name instead of ID in company autocomplete
   */
  public getCompanyName(company: ICompanyDto): string | null {
    return company ? company.name : null;
  }

  /**
   * Invoked when user clicks EDIT button on the company
   */
  public async handleEditClick(): Promise<void> {
    this._appNavigationService.goToContactEdit(this._contact.contactId);
  }

  /**
   * Invoked when user submits the form
   */
  public async handleFormSubmit(form: FormGroup): Promise<void> {

    if(form.valid) {

      let contactId = this._contact.contactId;

      if(this._viewMode === ViewMode.Edit)
        await this._contactHttpService.updateContact(this._contact);
      else if(this._viewMode === ViewMode.New) {
        let newContact = await this._contactHttpService.createContact(this._contact);
        contactId = newContact.contactId;
      }

      this._appNavigationService.goToContactView(contactId);
    }
  }

  /**
   * Invoked when user clicks DELETE button on a company
   */
  public async handleDeleteClick(): Promise<void> {

    let isConfirmed = await this._confirmationUi.confirm('CONTACT_MANAGER.CONTACT_DETAILS.MSG_DELETE_CONTACT');
    if(isConfirmed) {
      await this._contactHttpService.deleteContact(this._contact.contactId);
      this._appNavigationService.goToCompanyList();
    }
  }

  private async loadContact(contactId: number): Promise<void> {
    this._contact = await this._contactHttpService.getContact(contactId);

    if(this._contact.companyId)
      this._selectedCompany = await this._companyHttpServie.getCompany(this._contact.companyId);
  }
}

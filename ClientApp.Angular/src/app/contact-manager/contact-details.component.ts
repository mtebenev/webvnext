import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {FormGroup, FormControl, NgForm, FormGroupDirective} from '@angular/forms';

import {ErrorStateMatcher} from '@angular/material';

import {ContactHttpService, IContactDto} from '@http-services/contact-manager/contact-http.service';
import {CompanyHttpService, ICompanyDto, ICompanyQueryParamsDto} from '@http-services/contact-manager/company-http.service';
import {AppNavigationService, ConfirmationUi} from '@app-services/index';
import {EntityDetailsComponentbase, ViewMode} from './entity-details-component-base';

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
export class ContactDetailsComponent extends EntityDetailsComponentbase implements OnInit {

  private _contact: IContactDto;
  private readonly _contactHttpService: ContactHttpService;
  private readonly _companyHttpServie: CompanyHttpService;
  private readonly _appNavigationService: AppNavigationService;
  private readonly _confirmationUi: ConfirmationUi;

  private _companies: ICompanyDto[]; // For selecting related companies
  private _selectedCompany: ICompanyDto | string;
  private readonly _companySelectStateMatcher: CompanySelectStateMatcher;

  constructor(activatedRoute: ActivatedRoute, contactHttpService: ContactHttpService, companyHttpService: CompanyHttpService,
    appNavigationService: AppNavigationService, confirmationUi: ConfirmationUi) {

    super(activatedRoute);

    this._contactHttpService = contactHttpService;
    this._companyHttpServie = companyHttpService;
    this._appNavigationService = appNavigationService;
    this._confirmationUi = confirmationUi;
    this._companySelectStateMatcher = new CompanySelectStateMatcher();
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
    this.onInit();
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

      if(this.viewMode === ViewMode.Edit)
        await this._contactHttpService.updateContact(this._contact);
      else if(this.viewMode === ViewMode.New) {
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

  /**
   * Override
   */
  protected isEntityIdInRoute(routeSnapshot: ActivatedRouteSnapshot): boolean {
    return routeSnapshot.params.contactId ? true : false;
  }

  /**
   * Must be overridden in derived class and create new instance of the entity whe
   */
  protected async onSwitchMode(viewMode: ViewMode, routeSnapshot: ActivatedRouteSnapshot): Promise<void> {

    let contactId = routeSnapshot.params.contactId;
    if(!contactId && (viewMode === ViewMode.Edit || viewMode === ViewMode.View))
      throw new Error('Unexpected: cannot find entity ID on route');

    if(viewMode === ViewMode.View || viewMode === ViewMode.Edit) {
      this._contact = await this._contactHttpService.getContact(contactId);

      if(this._contact.companyId)
      this._selectedCompany = await this._companyHttpServie.getCompany(this._contact.companyId);

    } else {
      this._contact = {contactId: 0, firstName: null, lastName: null, companyId: 0};
    }
  }
}
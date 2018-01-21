import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';

import {ContactHttpService, IContactDto} from '@http-services/contact-manager/contact-http.service';
import {AppNavigationService, ConfirmationUi} from '@app-services/index';

enum ViewMode {
  None = 'none',
  View = 'view',
  Edit = 'edit',
  New = 'new'
}

@Component({
  templateUrl: './contact-details.component.html'
})
export class ContactDetailsComponent implements OnInit {

  private _contact: IContactDto;
  private _activatedRoute: ActivatedRoute;
  private _contactHttpService: ContactHttpService;
  private _appNavigationService: AppNavigationService;
  private _viewMode: ViewMode;
  private _confirmationUi: ConfirmationUi;

  constructor(activatedRoute: ActivatedRoute, contactHttpService: ContactHttpService, appNavigationService: AppNavigationService, confirmationUi: ConfirmationUi) {

    this._activatedRoute = activatedRoute;
    this._contactHttpService = contactHttpService;
    this._appNavigationService = appNavigationService;
    this._viewMode = ViewMode.None;
    this._confirmationUi = confirmationUi;
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
  }
}

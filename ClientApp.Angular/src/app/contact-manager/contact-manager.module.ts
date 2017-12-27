import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {ContactManagerRoutingModule} from './contact-manager-routing.module';
import {
  CompanyEditComponent, CompanyListComponent, CompanyNewComponent, ContactEditComponent, ContactListComponent, ContactNewComponent,
  CompaniesComponent, ContactsComponent
} from './index';

const moduleComponents = [
  CompanyListComponent,
  CompanyNewComponent,
  CompanyEditComponent,
  ContactListComponent,
  ContactNewComponent,
  ContactEditComponent,
  CompaniesComponent,
  ContactsComponent
];

@NgModule({
  declarations: [
    ...moduleComponents
  ],
  imports: [
    SharedModule,
    ContactManagerRoutingModule
  ],
  entryComponents: [
    CompanyListComponent,
    ContactListComponent
  ]
})
export class ContactManagerModule {
}

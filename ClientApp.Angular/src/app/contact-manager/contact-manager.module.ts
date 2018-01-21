import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {ContactManagerRoutingModule} from './contact-manager-routing.module';
import {
  CompanyListComponent, ContactListComponent, CompaniesComponent, ContactsComponent, CompanyDetailsComponent, ContactDetailsComponent
} from './index';

const moduleComponents = [
  CompanyListComponent,
  ContactListComponent,
  CompaniesComponent,
  CompanyDetailsComponent,
  ContactsComponent,
  ContactDetailsComponent
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

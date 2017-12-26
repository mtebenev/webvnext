import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {ContactManagerRoutingModule} from './contact-manager-routing.module';
import {
  CompanyEditComponent, CompanyListComponent, CompanyNewComponent, ContactEditComponent, ContactListComponent, ContactNewComponent
} from './index';

const moduleComponents = [
  CompanyListComponent,
  CompanyNewComponent,
  CompanyEditComponent,
  ContactListComponent,
  ContactNewComponent,
  ContactEditComponent,
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
    ContactListComponent,
    CompanyListComponent
  ]
})
export class ContactManagerModule {
}

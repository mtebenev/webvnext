import {NgModule} from '@angular/core';

import {SharedModule} from '../shared/shared.module';
import {ContactManagerRoutingModule} from './contact-manager-routing.module';

import {CompanyListComponent} from './company-list.component';
import {CompanyNewComponent} from './company-new.component';
import {CompanyEditComponent} from './company-edit.component';
import {ContactListComponent} from './contact-list.component';
import {ContactNewComponent} from './contact-new.component';
import {ContactEditComponent} from './contact-edit.component';

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
})
export class ContactManagerModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {CompanyListComponent} from './company-list.component';
import {CompanyNewComponent} from './company-new.component';
import {CompanyEditComponent} from './company-edit.component';
import {ContactListComponent} from './contact-list.component';
import {ContactNewComponent} from './contact-new.component';
import {ContactEditComponent} from './contact-edit.component';

import {RouteGuardAuthOidc} from '@services/route-guard-auth-oidc.service';

const routes: Routes = [
  {path: 'companies', component: CompanyListComponent, canActivate: [RouteGuardAuthOidc]},
  {path: 'companies/new', component: CompanyNewComponent, canActivate: [RouteGuardAuthOidc]},
  {path: 'companies/:companyId', component: CompanyEditComponent, canActivate: [RouteGuardAuthOidc]},
  {path: 'contacts', component: ContactListComponent, canActivate: [RouteGuardAuthOidc]},
  {path: 'contacts/new', component: ContactNewComponent, canActivate: [RouteGuardAuthOidc]},
  {path: 'contacts/:contactId', component: ContactEditComponent, canActivate: [RouteGuardAuthOidc]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ContactManagerRoutingModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule, UrlSegment, UrlSegmentGroup, Route, UrlMatchResult} from '@angular/router';

import {
  CompanyEditComponent, CompanyListComponent, CompanyNewComponent, ContactEditComponent, ContactListComponent, ContactNewComponent,
  CompaniesComponent, ContactsComponent
} from './index';
import {RouteGuardAuthOidc} from '@services/route-guard-auth-oidc.service';

const routes: Routes = [
  {
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [RouteGuardAuthOidc],

    children: [
      {
        path: 'new',
        component: CompanyNewComponent
      },
      {
        path: ':companyId',
        component: CompanyEditComponent,
      },
    ]
  },

  {
    path: 'contacts',
    component: ContactsComponent,
    canActivate: [RouteGuardAuthOidc],
    children: [
      {
        path: 'new',
        component: ContactNewComponent,
      },
      {
        path: ':contactId',
        component: ContactEditComponent
      }
    ]
  }
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

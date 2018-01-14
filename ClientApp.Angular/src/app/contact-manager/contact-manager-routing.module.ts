import {NgModule} from '@angular/core';
import {Routes, RouterModule, UrlSegment, UrlSegmentGroup, Route, UrlMatchResult} from '@angular/router';

import {
  CompanyEditComponent, CompanyListComponent, CompanyNewComponent, ContactEditComponent, ContactListComponent, ContactNewComponent,
  CompaniesComponent, CompanyDetailsComponent, ContactsComponent
} from './index';
import {RouteGuardAuthOidc} from '@app-services/route-guard-auth-oidc.service';

const routes: Routes = [
  {
    path: 'companies',
    component: CompaniesComponent,
    canActivate: [RouteGuardAuthOidc],

    children: [
      {
        path: 'new',
        component: CompanyDetailsComponent
      },
      {
        path: ':companyId/edit',
      component: CompanyDetailsComponent
      },
      {
        path: ':companyId',
        component: CompanyDetailsComponent,
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

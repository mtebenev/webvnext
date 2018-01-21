import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {
  CompaniesComponent, CompanyDetailsComponent, ContactsComponent, ContactDetailsComponent
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
        component: ContactDetailsComponent,
      },
      {
        path: ':contactId/edit',
        component: ContactDetailsComponent
      },
      {
        path: ':contactId',
        component: ContactDetailsComponent,
      },
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

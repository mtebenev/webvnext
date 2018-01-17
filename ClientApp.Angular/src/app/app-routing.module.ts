import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RouteGuardAuthOidc} from '@app-services/route-guard-auth-oidc.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'contacts',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [RouteGuardAuthOidc]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false,
      initialNavigation: true
    }),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

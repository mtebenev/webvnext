import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {NgModule, ErrorHandler} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration} from 'angular-auth-oidc-client';

import {AppComponent} from './app.component';
import {CompanyListComponent} from './contact-manager/company-list.component';
import {CompanyNewComponent} from './contact-manager/company-new.component';
import {CompanyEditComponent} from './contact-manager/company-edit.component';
import {ErrorUnauthorizedComponent} from './error-unauthorized.component';

import {CompanyHttpService} from './services/contact-manager/company-http.service';
import {RouteGuardAuthOidc} from './services/route-guard-auth-oidc.service';
import {CommonErrorHandler} from './core/common-error-handler';

const appRoutes: Routes = [
  {path: 'companies', component: CompanyListComponent, canActivate: [RouteGuardAuthOidc]},
  {path: 'companies/new', component: CompanyNewComponent, canActivate: [RouteGuardAuthOidc]},
  {path: 'companies/:companyId', component: CompanyEditComponent, canActivate: [RouteGuardAuthOidc]},
  {path: 'home', component: CompanyListComponent, canActivate: [RouteGuardAuthOidc]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'Unauthorized', component: ErrorUnauthorizedComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CompanyListComponent,
    CompanyNewComponent,
    CompanyEditComponent,
    ErrorUnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [
    CompanyHttpService,
    RouteGuardAuthOidc,
    {
      provide: ErrorHandler,
      useClass: CommonErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(public oidcSecurityService: OidcSecurityService) {
    this.configureAuthentication();
  }

  private configureAuthentication(): void {

    let openIDImplicitFlowConfiguration = new OpenIDImplicitFlowConfiguration();

    // openIDImplicitFlowConfiguration.stsServer = 'http://localhost:59613';
    openIDImplicitFlowConfiguration.stsServer = 'http://localhost:63161';
    openIDImplicitFlowConfiguration.redirect_url = 'http://localhost:4200';
    openIDImplicitFlowConfiguration.client_id = 'angularclient';
    openIDImplicitFlowConfiguration.response_type = 'id_token token';
    openIDImplicitFlowConfiguration.scope = 'openid profile api1';
    openIDImplicitFlowConfiguration.post_logout_redirect_uri = 'http://localhost:4200/Unauthorized';
    openIDImplicitFlowConfiguration.start_checksession = false;
    openIDImplicitFlowConfiguration.silent_renew = true;
    openIDImplicitFlowConfiguration.silent_renew_offset_in_seconds = 0;
    openIDImplicitFlowConfiguration.post_login_route = '/home';
    openIDImplicitFlowConfiguration.forbidden_route = '/Forbidden';
    openIDImplicitFlowConfiguration.unauthorized_route = '/Unauthorized';
    openIDImplicitFlowConfiguration.auto_userinfo = true;
    openIDImplicitFlowConfiguration.log_console_warning_active = true;
    openIDImplicitFlowConfiguration.log_console_debug_active = false;
    openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 10;
    openIDImplicitFlowConfiguration.override_well_known_configuration = false;
    openIDImplicitFlowConfiguration.override_well_known_configuration_url = 'http://localhost:63161/wellknownconfiguration.json';
    //openIDImplicitFlowConfiguration.override_well_known_configuration_url = 'http://localhost:59613/wellknownconfiguration.json';
    // openIDImplicitFlowConfiguration.storage = localStorage;

    this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration);
  }
}

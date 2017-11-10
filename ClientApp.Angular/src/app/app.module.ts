import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration} from 'angular-auth-oidc-client';

import {AppComponent} from './app.component';
import {CompanyListComponent} from './contact-manager/company-list.component';
import {ErrorUnauthorizedComponent} from './error-unauthorized.component';

const appRoutes: Routes = [
  {path: '', component: AppComponent},
  {path: 'companies', component: CompanyListComponent},
  {path: 'Unauthorized', component: ErrorUnauthorizedComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CompanyListComponent,
    ErrorUnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
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

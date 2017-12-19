import {BrowserModule} from '@angular/platform-browser';
import {NgModule, ErrorHandler} from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AuthModule, OidcSecurityService, OpenIDImplicitFlowConfiguration} from 'angular-auth-oidc-client';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppNavigationService} from '@services/app-navigation.service';

import {environment} from '@environments/environment';
import {AppComponent} from './app.component';
import {ErrorUnauthorizedComponent} from './error-unauthorized.component';

import {CompanyHttpService} from '@services/contact-manager/company-http.service';
import {ContactHttpService} from '@services/contact-manager/contact-http.service';
import {RouteGuardAuthOidc} from './services/route-guard-auth-oidc.service';
import {CommonErrorHandler} from './core/common-error-handler';

import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {ContactManagerModule} from './contact-manager/contact-manager.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorUnauthorizedComponent
  ],
  imports: [
    SharedModule,
    ContactManagerModule, // Eager-loaded initial module
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslationLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AppNavigationService,
    CompanyHttpService,
    ContactHttpService,
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

    openIDImplicitFlowConfiguration.stsServer = environment.identityServerConfig.serverUrl;
    openIDImplicitFlowConfiguration.redirect_url = environment.identityServerConfig.clientBaseUrl;
    openIDImplicitFlowConfiguration.client_id = 'angularclient';
    openIDImplicitFlowConfiguration.response_type = 'id_token token';
    openIDImplicitFlowConfiguration.scope = 'openid profile api1';
    openIDImplicitFlowConfiguration.post_logout_redirect_uri = `${environment.identityServerConfig.clientBaseUrl}/Unauthorized`;
    openIDImplicitFlowConfiguration.start_checksession = false;
    openIDImplicitFlowConfiguration.silent_renew = true;
    openIDImplicitFlowConfiguration.silent_renew_offset_in_seconds = 0;
    openIDImplicitFlowConfiguration.post_login_route = '/';
    openIDImplicitFlowConfiguration.forbidden_route = '/Forbidden';
    openIDImplicitFlowConfiguration.unauthorized_route = '/Unauthorized';
    openIDImplicitFlowConfiguration.auto_userinfo = true;
    openIDImplicitFlowConfiguration.log_console_warning_active = true;
    openIDImplicitFlowConfiguration.log_console_debug_active = false;
    openIDImplicitFlowConfiguration.max_id_token_iat_offset_allowed_in_seconds = 10;
    openIDImplicitFlowConfiguration.override_well_known_configuration = false;
    openIDImplicitFlowConfiguration.override_well_known_configuration_url = `${environment.identityServerConfig.serverUrl}/wellknownconfiguration.json`;

    this.oidcSecurityService.setupModule(openIDImplicitFlowConfiguration);
  }
}

export function createTranslationLoader(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient);
}

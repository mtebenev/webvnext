import {ModuleWithProviders, NgModule, Optional, SkipSelf, Provider} from '@angular/core';

import {SharedModule} from '../shared/shared.module';

// App components
import {AppHeaderComponent} from './components/app-header.component';
import {AppSidebarComponent} from './components/app-sidebar.component';

// App services
import {AppNavigationService, ViewContextService, ConfirmationUi, ConfirmationUiService, RouteGuardAuthOidc, PortalManagerService} from '@app-services/index';

// Http services
import {CompanyHttpService} from '@http-services/contact-manager/company-http.service';
import {ContactHttpService} from '@http-services/contact-manager/contact-http.service';

const appServiceProviders: Provider[] = [
  RouteGuardAuthOidc,
  AppNavigationService,
  ViewContextService,
  {
    provide: ConfirmationUi,
    useClass: ConfirmationUiService
  },
  PortalManagerService
];

const httpServices = [
  CompanyHttpService,
  ContactHttpService
];

const appComponents = [
  AppHeaderComponent,
  AppSidebarComponent
];

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    ...appComponents
  ],
  exports: [
    ...appComponents
  ],
  providers: [
    ...appServiceProviders,
    ...httpServices,
  ]
})
export class CoreModule {

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if(parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
      ]
    };
  }
}

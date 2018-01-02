import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';

// App services
import {AppNavigationService} from '@app-services/app-navigation.service';
import {RouteGuardAuthOidc} from '@app-services/route-guard-auth-oidc.service';

// Http services
import {CompanyHttpService} from '@http-services/contact-manager/company-http.service';
import {ContactHttpService} from '@http-services/contact-manager/contact-http.service';


const appServices = [
	RouteGuardAuthOidc,
	AppNavigationService
];

const httpServices = [
	CompanyHttpService,
	ContactHttpService
];

@NgModule({
	imports: [],
	declarations: [],
	exports: [],
	providers: [
		...appServices,
		...httpServices
	]
})
export class CoreModule {

	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
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
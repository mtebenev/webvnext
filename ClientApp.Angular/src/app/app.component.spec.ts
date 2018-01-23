import {TestBed, async} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {APP_BASE_HREF} from '@angular/common';

import {AppComponent} from './app.component';
import {AppHeaderComponent} from './core/components/app-header.component';
import {AppSidebarComponent} from './core/components/app-sidebar.component';
import {SharedModule} from './shared/shared.module';

import {ViewContextService} from '@app-services/view-context.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AppHeaderComponent,
        AppSidebarComponent
      ],
      imports: [
        SharedModule,
        TranslateModule.forRoot(),
        RouterModule.forRoot([]),
        NoopAnimationsModule
      ],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        ViewContextService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

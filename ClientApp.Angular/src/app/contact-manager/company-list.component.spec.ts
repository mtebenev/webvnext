import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {SharedModule} from '@shared/shared.module';
import {CompanyListComponent} from './company-list.component';
import {CompanyHttpService} from '@http-services/contact-manager/company-http.service';

let fixture: ComponentFixture<CompanyListComponent>;

describe('CompanyListComponent', () => {

  beforeEach(async(() => {

    let mockCompanyHttp = jasmine.createSpyObj<CompanyHttpService>('CompanyHttpService', ['getCompanies']);

    TestBed.configureTestingModule({
      declarations: [
        CompanyListComponent,
      ],
      imports: [
        SharedModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: CompanyHttpService, useValue: mockCompanyHttp
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyListComponent);
  }));

  it('Should perform paged request', () => {

    let componentInstance = fixture.componentInstance;
    componentInstance.handlePageChange({pageIndex: 2, pageSize: 20, length: 100});

    let mockCompanyHttp: jasmine.SpyObj<CompanyHttpService> = TestBed.get(CompanyHttpService);
    expect(mockCompanyHttp.getCompanies).toHaveBeenCalledWith(jasmine.objectContaining({pageNumber: 2, pageSize: 20}));
  });

});

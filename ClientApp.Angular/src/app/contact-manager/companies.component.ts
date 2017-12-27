import {Component} from '@angular/core';

import {CompanyListComponent} from './company-list.component';

/**
 * Displays master/details for company entity
 */
@Component({
  templateUrl: './companies.component.html'
})
export class CompaniesComponent {
  public masterComponentType = CompanyListComponent;
}

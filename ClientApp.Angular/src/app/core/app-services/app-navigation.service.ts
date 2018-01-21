import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

/**
 * Encapsulates Angular router and performs navigation through the application
 */
@Injectable()
export class AppNavigationService {

  constructor(private router: Router) {

  }

  /**
   * Navigates to company list
   */
  public goToCompanyList(): void {
    this.router.navigate(['/companies']);
  }

  /**
   * Navigates to a specific company (edit mode)
   */
  public goToCompanyEdit(companyId: number): void {
    this.router.navigate(['/companies', companyId.toString(), 'edit']);
  }

  /**
   * Navigates to a specific company (view mode)
   */
  public goToCompanyView(companyId: number): void {
    this.router.navigate(['/companies', companyId.toString()]);
  }

  /**
   * Navigates to contact list
   */
  public goToContactList(): void {
    this.router.navigate(['/contacts']);
  }

  /**
   * Navigates to a specific contact (edit mode)
   */
  public goToContactEdit(contactId: number): void {
    this.router.navigate(['/contacts', contactId.toString(), 'edit']);
  }

  /**
   * Navigates to a specific contact (view mode)
   */
  public goToContactView(contactId: number): void {
    this.router.navigate(['/contacts', contactId.toString()]);
  }
}

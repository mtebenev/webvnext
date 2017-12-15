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
   * Navigates to contact list
   */
  public goToContactList(): void {
    this.router.navigate(['/contacts']);
  }
}

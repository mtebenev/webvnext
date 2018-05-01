import {History} from 'history';

/**
 * Encapsulates navigation logic
 */
export class AppNavigationService {

  private _history: History;

  constructor(history: History) {
    this._history = history;
  }

  /**
   * Navigates to a specific company (view mode)
   */
  public goToCompanyView(companyId: number): void {
    this._history.push(`/companies/${companyId}`);
  }
}

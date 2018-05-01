import * as PropTypes from 'prop-types';

import {CompanyHttpService} from '@http-services/contact-manager/company-http.service';
import {AppNavigationService} from '@app-services/app-navigation.service';
import {ConfirmationUiService} from '@app-services/confirmation-ui.service';

/**
 * Common React context for company-related views
 */
export interface ICompaniesContext {
  companyHttpService: CompanyHttpService;
  appNavigationService: AppNavigationService;
  confirmationUiService: ConfirmationUiService;
}

export type TCompaniesContextTypes = PropTypes.ValidationMap<ICompaniesContext>;
export const CompaniesContextTypes: TCompaniesContextTypes = {
  companyHttpService: PropTypes.instanceOf(CompanyHttpService),
  appNavigationService: PropTypes.instanceOf(AppNavigationService),
  confirmationUiService: PropTypes.instanceOf(ConfirmationUiService)
};

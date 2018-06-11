import * as PropTypes from 'prop-types';

import {CompanyHttpService} from 'client-common-lib';
import {AppNavigationService} from '@app-services/app-navigation.service';
import {ConfirmationUi} from '@app-services/confirmation-ui';

/**
 * Common React context for company-related views
 */
export interface ICompaniesContext {
  companyHttpService: CompanyHttpService;
  appNavigationService: AppNavigationService;
  confirmationUi: Promise<ConfirmationUi>;
}

export type TCompaniesContextTypes = PropTypes.ValidationMap<ICompaniesContext>;
export const CompaniesContextTypes: TCompaniesContextTypes = {
  companyHttpService: PropTypes.instanceOf(CompanyHttpService),
  appNavigationService: PropTypes.instanceOf(AppNavigationService),
  confirmationUi: PropTypes.object
};

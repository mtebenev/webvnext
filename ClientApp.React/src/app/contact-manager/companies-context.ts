import * as PropTypes from 'prop-types';

import {CompanyHttpService} from '@http-services/contact-manager/company-http.service';

/**
 * Common React context for company-related views
 */
export interface ICompaniesContext {
  companyHttpService: CompanyHttpService;
}

export type TCompaniesContextTypes = PropTypes.ValidationMap<ICompaniesContext>;
export const CompaniesContextTypes: TCompaniesContextTypes = {
  companyHttpService: PropTypes.instanceOf(CompanyHttpService)
};

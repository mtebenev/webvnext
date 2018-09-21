import * as React from 'react';

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

export interface ICompaniesContextProps {
  companiesContext: ICompaniesContext;
}

export const CompaniesContext = React.createContext<ICompaniesContext | {}>({});

/**
 * HOC for app context injection
 * TODO MTE: rewrite with generic + fix return any
 */
export function withCompaniesContext<C extends React.ComponentClass>(Component: C): any {
  return ((props: any) => (
    <CompaniesContext.Consumer>
      {context => <Component {...props} companiesContext={context} />}
    </CompaniesContext.Consumer>)) as any
}

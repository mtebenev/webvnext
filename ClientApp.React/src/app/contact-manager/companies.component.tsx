import * as React from 'react';
import {Route, RouteComponentProps, Switch} from 'react-router-dom';

import {MediaQueryLtSm} from '@core/ui/media-query-alias';
import {CompanyListComponent, CompanyDetailsComponent, CompanyNewComponent} from './index';
import {withAppContext, IAppContextProps} from '../app-context';
import {CompaniesContext, ICompaniesContext} from './companies-context';
import {CompanyHttpService} from 'client-common-lib';
import {AppNavigationService} from '@app-services/app-navigation.service';
import {FxContainer} from '@layout/fx-container';
import {FxFill} from '@layout/fx-fill';
import {AuthTokenProvider} from '@common/auth-token-provider';
import {AppPortal} from '@core/ui/app-portal';
import {AppFabButton} from '@shared/app-fab-button';
import {UiConstants} from '@core/ui/ui-constants';

interface IRouteParams {
  companyId: string;
}

type IProps = IAppContextProps & RouteComponentProps<IRouteParams>;

/**
 * Root component for companies view. Changes layout depending on screen resolution.
 */
class CompaniesComponentImpl extends React.Component<IProps> {

  private _companiesContext: ICompaniesContext;

  constructor(props: IProps) {
    super(props);

    const authTokenProvider = new AuthTokenProvider(props.appContext.userManager);
    const companyHttpService = new CompanyHttpService(authTokenProvider, process.env.REACT_APP_API_BASE_URL as string);
    const appNavigationService = new AppNavigationService(props.history);

    this._companiesContext = {
      companyHttpService: companyHttpService,
      appNavigationService: appNavigationService,
      confirmationUi: props.appContext.confirmationUi
    };

    this.state = {};
  }

  /**
   * React.Component
   */
  public render(): React.ReactNode {

    return (
      <CompaniesContext.Provider value={this._companiesContext}>
        <FxFill>
          {/* Add new Company FAB */}
          <AppPortal name={UiConstants.PORTAL_FAB}>
            <AppFabButton toUrl="/companies/new" />
          </AppPortal>

          {/* Layout */}
          <MediaQueryLtSm>{
            (matches: boolean) => {
              return matches
                ? this.renderSmallScreen()
                : this.renderLargeScreen();
            }
          }
          </MediaQueryLtSm>
        </FxFill>
      </CompaniesContext.Provider>
    );
  }

  /**
   * Stacked layout for small devices
   */
  private renderSmallScreen(): React.ReactNode {
    return (
      <Switch>
        <Route exact={true} path="/companies" render={props => <CompanyListComponent style={{height: '100%'}} />} />
        <Route
          exact={true}
          path="/companies/new"
          render={props => <CompanyNewComponent />}
        />
        <Route
          path="/companies/:companyId"
          render={props => <CompanyDetailsComponent {...props} />}
        />
      </Switch>
    );
  }

  private renderLargeScreen(): React.ReactNode {
    return (
      <FxContainer
        flexFill={true}
        layout="row"
      >
        <CompanyListComponent style={{flex: '1'}} />
        <Switch>
          <Route
            exact={true}
            path="/companies/new"
            render={props => <CompanyNewComponent style={{flex: '1'}} />}
          />
          <Route
            path="/companies/:companyId"
            render={props => <CompanyDetailsComponent style={{flex: '1'}} {...props} />}
          />
        </Switch>
      </FxContainer>
    );
  }
}

export const CompaniesComponent = withAppContext(CompaniesComponentImpl);

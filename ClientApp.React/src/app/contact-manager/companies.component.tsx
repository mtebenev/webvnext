import * as React from 'react';
import {Route, RouteComponentProps, Switch, Link} from 'react-router-dom';
import {Button, Icon} from '@core/mui-exports';
import {History} from 'history';

import {MediaQueryLtSm} from '@core/ui/media-query-alias';
import {CompanyListComponent, CompanyDetailsComponent, CompanyNewComponent} from './index';
import {IAppContext, AppContextTypes, TAppContextTypes} from '../app-context';
import {ICompaniesContext, CompaniesContextTypes, TCompaniesContextTypes} from './companies-context';
import {CompanyHttpService} from '@http-services/contact-manager/company-http.service';
import {AppNavigationService} from '@app-services/app-navigation.service';
import {ConfirmationUiService} from '@app-services/confirmation-ui.service';
import {FxContainer} from '@layout/fx-container';
import {FxFill} from '@layout/fx-fill';

interface IRouteParams {
  companyId: string;
}

interface IProps extends RouteComponentProps<IRouteParams>, React.HTMLProps<any> {
}

/**
 * Root component for companies view. Changes layout depending on screen resolution.
 */
export class CompaniesComponent extends React.Component implements React.ChildContextProvider<ICompaniesContext> {

  private _companiesContext: ICompaniesContext;

  public static childContextTypes: TCompaniesContextTypes = CompaniesContextTypes;
  public static contextTypes: TAppContextTypes = AppContextTypes;

  constructor(props: IProps, context: IAppContext) {
    super(props);

    let companyHttpService = new CompanyHttpService(context.userManager, process.env.REACT_APP_API_BASE_URL as string, 'companies');
    let appNavigationService = new AppNavigationService(props.history);

    this._companiesContext = {
      companyHttpService: companyHttpService,
      appNavigationService: appNavigationService,
      confirmationUi: context.confirmationUi
    };

    this.state = {};
  }

  /**
   * React.ChildContextProvider
   */
  public getChildContext(): ICompaniesContext {
    return this._companiesContext;
  }

  /**
   * React.Component
   */
  public render(): React.ReactNode {

    return (
      <FxFill>
        {/* Add new Company FAB */}
        <Button
          variant="fab"
          color="primary"
          style={{position: 'fixed', right: '50px', bottom: '50px'}}
          component={(props: any) => <Link to="/companies/new" {...props} />}
        >
          <Icon>add_icon</Icon>
        </Button>

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
    );
  }

  /**
   * Stacked layout for small devices
   */
  private renderSmallScreen(): React.ReactNode {
    return (
      <div>
        <Switch>
          <Route exact={true} path="/companies" render={props => <CompanyListComponent />} />
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
      </div>
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

import * as React from 'react';
import {Route, RouteComponentProps, Switch} from 'react-router-dom';

import {MediaQueryLtSm} from '@core-ui/media-query-alias';
import {CompanyListComponent, CompanyDetailsComponent} from './index';
import {IAppContext, AppContextTypes, TAppContextTypes} from '../app-context';
import {ICompaniesContext, CompaniesContextTypes, TCompaniesContextTypes} from './companies-context';
import {CompanyHttpService} from '@http-services/contact-manager/company-http.service';

interface IRouteParams {
  companyId: string;
}

interface IProps extends RouteComponentProps<IRouteParams>, React.Props<any> {
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

    let companyHttpService = new CompanyHttpService(context.userManager, 'http://localhost:5200/api', 'companies');
    this._companiesContext = {
      companyHttpService: companyHttpService
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
      <div style={{border: '1px solid red'}}>
        <MediaQueryLtSm>{
          (matches: boolean) => {
            return matches
              ? this.renderSmallScreen()
              : this.renderLargeScreen();
          }
        }
        </MediaQueryLtSm>
      </div>
    );
  }

  /**
   * Stacked layout for small devices
   */
  private renderSmallScreen(): React.ReactNode {
    return (
      <div>
        <Switch>
          <Route exact={true} path="/companies" render={props => <CompanyListComponent/>} />
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
      <div>
        <div style={{border: '1px solid blue'}}>
          Company list
        </div>
        <Route
          path="/companies/:companyId"
          render={props => (
            <div style={{border: '1px solid blue'}}>
              Company details
          </div>
          )}
        />
      </div>
    );
  }
}

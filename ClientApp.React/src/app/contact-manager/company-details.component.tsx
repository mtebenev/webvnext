import * as React from 'react';
import * as PropTypes from 'prop-types';
import {RouteComponentProps, Link, Route, Switch} from 'react-router-dom';
import {UserManager} from 'oidc-client';

import {CompanyViewComponent, CompanyEditComponent} from './index';
import {CompanyHttpService} from '@http-services/contact-manager/company-http.service';

interface IRouteParams {
  companyId: string;
}

interface IProps extends RouteComponentProps<IRouteParams>, React.Props<any> {
  userManager: UserManager;
}

export interface ICompanyDetailsContext {
  companyHttpService: CompanyHttpService;
}

/**
 * Logic for switching between view/edit company components
 */
export class CompanyDetailsComponent extends React.Component<IProps> implements React.ChildContextProvider<ICompanyDetailsContext> {

  private _context: ICompanyDetailsContext;

  public static childContextTypes: PropTypes.ValidationMap<ICompanyDetailsContext> = {
    companyHttpService: PropTypes.instanceOf(CompanyHttpService)
  };

  constructor(props: IProps) {
    super(props);

    this.state = {};
    let companyHttpService = new CompanyHttpService(this.props.userManager, 'http://localhost:5200/api', 'companies');

    this._context = {
      companyHttpService: companyHttpService
    };
  }

  /**
   * React.Component
   * TODOA: we are hardcoding path in Route same as in App.Component instead of reusing ${this.props.match.url}. Should we introduce companyId to props?
   */
  public render(): React.ReactNode {

    return (
      <div>{this.props.match.params.companyId &&
        <div>
          Details component
          Company: {this.props.match.params.companyId}
        <Link to={`${this.props.match.url}/edit`}>Edit company</Link>

        <Switch>
          <Route exact={true} path={'/companies/:companyId'} render={props => (<CompanyViewComponent {...props} userManager={this.props.userManager} />)} />
          <Route path={'/companies/:companyId/edit'} render={props => (<CompanyEditComponent {...props} userManager={this.props.userManager} />)} />
        </Switch>

        </div>
      }
      </div>
    );
  }

  /**
   * React.ChildContextProvider
   */
  public getChildContext(): ICompanyDetailsContext {
    return this._context;
  }
}

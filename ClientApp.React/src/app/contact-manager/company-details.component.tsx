import * as React from 'react';
import {RouteComponentProps, Link, Route, Switch} from 'react-router-dom';
import {AppBar, Toolbar, Button, Icon, IconButton} from '@core/mui-exports';

import {ICompanyDto} from '@http-services/contact-manager/company-http.service';
import {ICompaniesContext, CompaniesContextTypes, TCompaniesContextTypes} from './companies-context';
import {CompanyViewComponent, CompanyEditComponent} from './index';

interface IRouteParams {
  companyId: string;
}

interface IProps extends RouteComponentProps<IRouteParams>, React.HTMLProps<any> {
}

interface IState {
  company?: ICompanyDto;
}

/**
 * Logic for switching between view/edit company components
 */
export class CompanyDetailsComponent extends React.Component<IProps, IState> {

  private _companiesContext: ICompaniesContext;

  public static contextTypes: TCompaniesContextTypes = CompaniesContextTypes;

  constructor(props: IProps, context: ICompaniesContext) {
    super(props);

    this.state = {};
    this._companiesContext = context;
  }

  /**
   * React.Component
   * TODOA: we are hardcoding path in Route same as in App.Component instead of reusing ${this.props.match.url}. Should we introduce companyId to props?
   * TODO: children components are not re-rendered, check
   * https://github.com/reactjs/react-router-redux/issues/603
   * https://github.com/ReactTraining/react-router/issues/5242
   */
  public render(): React.ReactNode {

    return (
      <div style={this.props.style}>{this.state.company &&
        <div>
          <AppBar position="static" color="default">
            <Toolbar>
              {this.state.company.name}

              <IconButton color="secondary" component={props => <Link to={`${this.props.match.url}/edit`} {...props}/>}>
                <Icon>edit_icon</Icon>
              </IconButton>
              <Button variant="fab" color="secondary">
                <Icon>delete_icon</Icon>
              </Button>
            </Toolbar>
          </AppBar>

          <Switch>
            <Route exact={true} path={'/companies/:companyId'} render={props => (<CompanyViewComponent company={this.state.company as ICompanyDto} {...props} />)} />
            <Route path={'/companies/:companyId/edit'} render={props => (<CompanyEditComponent {...props} />)} />
          </Switch>

        </div>
      }
      </div>
    );
  }

  /**
   * ComponentLifecycle
   */
  public componentDidMount(): void {
    this.loadCompany();
  }

  private async loadCompany(): Promise<void> {

    let companyId = Number.parseInt(this.props.match.params.companyId);
    let company = await this._companiesContext.companyHttpService.getCompany(companyId);
    this.setState({company: company});
  }
}

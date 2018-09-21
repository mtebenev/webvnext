import * as React from 'react';
import {RouteComponentProps, Link, Route, Switch} from 'react-router-dom';
import {AppBar, Toolbar, Icon, IconButton, Typography} from '@core/mui-exports';

import {ICompanyDto} from 'client-common-lib';
import {withCompaniesContext, ICompaniesContextProps} from './companies-context';
import {CompanyViewComponent, CompanyEditComponent} from './index';

interface IRouteParams {
  companyId: string;
}

type TProps = ICompaniesContextProps & RouteComponentProps<IRouteParams> & React.HTMLProps<CompanyDetailsComponentImpl>;

interface IState {
  company?: ICompanyDto;
}

/**
 * Logic for switching between view/edit company components
 */
class CompanyDetailsComponentImpl extends React.Component<TProps, IState> {

  constructor(props: TProps) {
    super(props);

    this.state = {};
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
        <React.Fragment>
          <AppBar position="static" color="default" elevation={0}>
            <Toolbar>
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <Typography variant="title">
                  {this.state.company.name}
                </Typography>

                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <IconButton component={(props: any) => <Link to={`${this.props.match.url}/edit`} {...props} />}>
                    <Icon>edit_icon</Icon>
                  </IconButton>
                  <IconButton onClick={props => {this.handleDeleteClick();}}>
                    <Icon>delete_icon</Icon>
                  </IconButton>
                </div>
              </div>
            </Toolbar>
          </AppBar>

          <Switch>
            <Route exact={true} path={'/companies/:companyId'} render={props => (<CompanyViewComponent company={this.state.company as ICompanyDto} {...props} />)} />
            <Route path={'/companies/:companyId/edit'} render={props => (<CompanyEditComponent {...props} />)} />
          </Switch>

        </React.Fragment>
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

  /**
   * ComponentLifecycle
   */
  public componentDidUpdate?(prevProps: TProps, prevState: IState, prevContext: any): void {

    let isCompanyIdChanged = (prevProps.match.params.companyId != this.props.match.params.companyId);
    if(isCompanyIdChanged)
      this.loadCompany();
  }

  private async loadCompany(): Promise<void> {

    let companyId = Number.parseInt(this.props.match.params.companyId);

    let company = await this.props.companiesContext.companyHttpService.getCompany(companyId);
    this.setState({company: company});
  }

  /**
   * Invoked when user clicks 'Delete' button
   */
  private async handleDeleteClick(): Promise<void> {
    let confirmationUi = await this.props.companiesContext.confirmationUi;
    let confirmationResult = await confirmationUi.confirm('CONTACT_MANAGER.COMPANY_DETAILS.MSG_DELETE_COMPANY');

    if(confirmationResult) {
      let companyId = Number.parseInt(this.props.match.params.companyId);
      this.props.companiesContext.companyHttpService.deleteCompany(companyId);
    }
  }
}

export const CompanyDetailsComponent = withCompaniesContext(CompanyDetailsComponentImpl);

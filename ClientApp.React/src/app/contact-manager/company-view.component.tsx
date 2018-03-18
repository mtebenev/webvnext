import * as React from 'react';
import * as PropTypes from 'prop-types';
import {RouteComponentProps} from 'react-router-dom';
import {UserManager} from 'oidc-client';

import {ICompanyDto, CompanyHttpService} from '@http-services/contact-manager/company-http.service';
import {ICompanyDetailsContext} from './index';

interface IRouteParams {
  companyId: string;
}

interface IProps extends RouteComponentProps<IRouteParams>, React.Props<any> {
  userManager: UserManager;
}

interface IState {
  company?: ICompanyDto;
}

/**
 * View mode for company details
 */
export class CompanyViewComponent extends React.Component<IProps, IState> {

  private _context: ICompanyDetailsContext;

  public static contextTypes: PropTypes.ValidationMap<ICompanyDetailsContext> = {
    companyHttpService: PropTypes.instanceOf(CompanyHttpService)
  }

  constructor(props: IProps, context: ICompanyDetailsContext) {
    super(props);

    this.state = {};
    this._context = context;
  }

  /**
   * React.Component
   */
  public render(): React.ReactNode {
    return (
      <div>{this.state.company &&
        <div>
          I am company viewer: {this.props.match.params.companyId}
          Company name: {this.state.company.name}
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
    let company = await this._context.companyHttpService.getCompany(companyId);
    this.setState({company: company});
  }
}


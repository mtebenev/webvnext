import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {UserManager} from 'oidc-client';

import {CompanyHttpService, ICompanyDto} from '@http-services/contact-manager/company-http.service';

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

  constructor(props: IProps) {
    super(props);

    this.state = {};
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

    let companyHttpService = new CompanyHttpService(this.props.userManager, 'http://localhost:5200/api', 'companies');

    let companyId = Number.parseInt(this.props.match.params.companyId);
    let company = await companyHttpService.getCompany(companyId);
    alert('loaded company ' + companyId);
    this.setState({company: company});
  }
}


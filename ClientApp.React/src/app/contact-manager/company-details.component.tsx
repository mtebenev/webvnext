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
 * Displays details on a speciic company
 */
export class CompanyDetailsComponent extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {};
  }

  /**
   * ComponentLifecycle
   */
  public componentDidMount?(): void {
    this.loadCompany();
  }

  /**
   * React.Component
   */
  public render(): React.ReactNode {

    return (
      <div>{this.state.company &&
        <div>Company: {this.state.company.name}</div>
      }
      </div>
    );
  }

  private async loadCompany(): Promise<void> {

    let companyHttpService = new CompanyHttpService(this.props.userManager, 'http://localhost:5200/api', 'companies');

    let companyId = Number.parseInt(this.props.match.params.companyId);
    let company = await companyHttpService.getCompany(companyId);

    this.setState({company: company});
  }
}

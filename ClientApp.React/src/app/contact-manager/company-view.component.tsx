import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';

import {ICompanyDto} from '@http-services/contact-manager/company-http.service';
import {ICompaniesContext, CompaniesContextTypes, TCompaniesContextTypes} from './companies-context';

interface IRouteParams {
  companyId: string;
}

interface IProps extends RouteComponentProps<IRouteParams>, React.Props<any> {
}

interface IState {
  company?: ICompanyDto;
}

/**
 * View mode for company details
 */
export class CompanyViewComponent extends React.Component<IProps, IState> {

  private _companiesContext: ICompaniesContext;

  public static contextTypes: TCompaniesContextTypes = CompaniesContextTypes;

  constructor(props: IProps, context: ICompaniesContext) {
    super(props);

    this.state = {};
    this._companiesContext = context;
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
    let company = await this._companiesContext.companyHttpService.getCompany(companyId);
    this.setState({company: company});
  }
}


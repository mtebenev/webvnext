import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';

import {ICompanyDto} from '@http-services/contact-manager/company-http.service';

interface IRouteParams {
  companyId: string;
}

interface IProps extends RouteComponentProps<IRouteParams>, React.Props<any> {
  company: ICompanyDto
}

interface IState {
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
      <div>
        Description: {this.props.company.description || '<no description provided>'}
      </div>
    );
  }
}


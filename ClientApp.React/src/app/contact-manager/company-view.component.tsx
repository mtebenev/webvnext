import * as React from 'react';

import {ICompanyDto} from 'client-common-lib';


interface IProps extends React.HTMLProps<any> {
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


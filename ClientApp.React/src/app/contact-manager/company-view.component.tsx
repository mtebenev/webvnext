import * as React from 'react';

import {ICompanyDto} from 'client-common-lib';
import {Typography} from '@core/mui-exports';
import {MaterialBox} from '@layout/material-box';

interface IProps {
  company: ICompanyDto
}

/**
 * View mode for company details
 */
export class CompanyViewComponent extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
  }

  /**
   * React.Component
   */
  public render(): React.ReactNode {
    return (
      <MaterialBox>
        <Typography variant="body1">
          Description: {this.props.company.description || '<no description provided>'}
        </Typography>
      </MaterialBox>
    );
  }
}


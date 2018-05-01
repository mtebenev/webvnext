import * as React from 'react';
import {AppBar, Toolbar, Button, TextField, Typography} from '@core/mui-exports';

import {ICompanyDto} from '@http-services/contact-manager/company-http.service';
import {ICompaniesContext, CompaniesContextTypes, TCompaniesContextTypes} from './companies-context';

interface IProps extends React.HTMLProps<any> {
}

interface IState {
  company: ICompanyDto
}

/**
 * Creates a new company
 */
export class CompanyNewComponent extends React.Component<IProps, IState> {

  private _companiesContext: ICompaniesContext;
  public static contextTypes: TCompaniesContextTypes = CompaniesContextTypes;

  constructor(props: IProps, context: ICompaniesContext) {
    super(props);

    let company: ICompanyDto = {
      companyId: 0
    };

    this.state = {company: company};
  }

  /**
   * React.Component
   */
  public render(): React.ReactNode {
    return (
      <div style={this.props.style}>{this.state.company &&
        <div>
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="title">
                New Company
              </Typography>
            </Toolbar>
          </AppBar>

          <div>
            <TextField
              value={this.state.company.name}
              onChange={(e) => {this.handleCompanyNameChange(e)}}
              fullWidth={true}
              label="Name"
              required={true}
            />
          </div>
          <div>
            <TextField
              value={this.state.company.description}
              onChange={(e) => {this.handleCompanyDescriptionChange(e)}}
              fullWidth={true}
              label="Description"
            />
          </div>
          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button variant="raised" color="primary" onClick={() => {this.handleCreateClick();}}>Create</Button>
          </div>
        </div>
      }
      </div>
    );
  }

  /**
   * Invoked when user clicks Update button
   */
  private async handleCreateClick(): Promise<void> {

    this._companiesContext.companyHttpService.createCompany(this.state.company);
  }

  /**
   * Invoked when user changes company name
   */
  private handleCompanyNameChange(event: React.ChangeEvent<HTMLInputElement>): void {

    event.persist();
    this.setState(prevState => {
      return {...prevState, company: {...prevState.company, name: event.target.value} as ICompanyDto};
    });
  }

  /**
   * Invoked when user changes company description
   */
  private handleCompanyDescriptionChange(event: React.ChangeEvent<HTMLInputElement>): void {

    event.persist();
    this.setState(prevState => {
      return {...prevState, company: {...prevState.company, description: event.target.value} as ICompanyDto};
    });
  }

}


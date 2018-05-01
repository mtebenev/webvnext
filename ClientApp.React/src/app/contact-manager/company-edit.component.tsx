import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {Button, TextField} from '@core/mui-exports';

import {ICompanyDto} from '@http-services/contact-manager/company-http.service';
import {ICompaniesContext, CompaniesContextTypes, TCompaniesContextTypes} from './companies-context';

interface IRouteParams {
  companyId: string;
}

interface IProps extends RouteComponentProps<IRouteParams>, React.HTMLProps<any> {
}

interface IState {
  company?: ICompanyDto;
}

/**
 * Edit mode for companiies
 */
export class CompanyEditComponent extends React.Component<IProps, IState> {

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
      <div style={this.props.style}>{this.state.company &&
        <div>
          <div>
            <TextField fullWidth={true} value={this.state.company.name} onChange={(e) => {this.handleCompanyNameChange(e)}} />
          </div>
          <div>
            <TextField fullWidth={true} value={this.state.company.description} onChange={(e) => {this.handleCompanyDescriptionChange(e)}} />
          </div>

          <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Button variant="raised" color="primary" onClick={() => {this.handleUpdateClick();}}>Update</Button>
          </div>
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


  /**
   * Invoked when user clicks Update button
   */
  private async handleUpdateClick(): Promise<void> {
    if(this.state.company) {
      await this._companiesContext.companyHttpService.updateCompany(this.state.company);
      this._companiesContext.appNavigationService.goToCompanyView(this.state.company.companyId);
    }
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


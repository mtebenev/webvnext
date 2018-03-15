import * as React from 'react';
import {RouteComponentProps} from 'react-router-dom';
import {UserManager} from 'oidc-client';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

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
 * Edit mode for companiies
 */
export class CompanyEditComponent extends React.Component<IProps, IState> {

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
          <div>
            <TextField value={this.state.company.name} onChange={(e) => {this.handleCompanyNameChange(e)}} />
          </div>
          <div>
            <TextField value={this.state.company.description}  onChange={(e) => {this.handleCompanyDescriptionChange(e)}}/>
          </div>

          <Button variant="raised" color="primary" onClick={() => {this.handleUpdateClick();}}>Update</Button>
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


  /**
   * Invoked when user clicks Update button
   */
  private async handleUpdateClick(): Promise<void> {
    if(this.state.company) {
      let companyHttpService = new CompanyHttpService(this.props.userManager, 'http://localhost:5200/api', 'companies');
      companyHttpService.updateCompany(this.state.company);
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


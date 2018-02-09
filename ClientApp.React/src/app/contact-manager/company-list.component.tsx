import * as React from 'react';
import {UserManager} from 'oidc-client';
import List, {ListItem, ListItemText} from 'material-ui/List';
import {Link} from 'react-router-dom';

import {CompanyHttpService, ICompanyQueryParamsDto, ICompanyDto} from '@http-services/contact-manager/company-http.service';
import {IPagedResultDto} from '@common/ipaged-result-dto';

interface IProps {
  userManager: UserManager;
}

interface IState {
  companies?: IPagedResultDto<ICompanyDto>;
}

export class CompanyListComponent extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {}
  }

  /**
   * React.Component
   */
  public render(): React.ReactNode {
    return (
      <div>
        <div>I am company list</div>
        <button onClick={e => this.handleGetCompaniesClick()}>Get Companies</button>

        {this.state.companies &&
          <List>
            {
              this.state.companies.rows.map(c => (
                <ListItem button={true} component={props => <Link to={`/companies/${c.companyId}`} />} >
                  <ListItemText primary={c.name} />
                </ListItem>
              ))
            }
          </List>
        }

      </div>
    );
  }

  public async handleGetCompaniesClick(): Promise<void> {

    let companyHttpService = new CompanyHttpService(this.props.userManager, 'http://localhost:5200/api', 'companies');

    let queryParams: ICompanyQueryParamsDto = {
      pageSize: 20,
      pageNumber: 0
    };

    let response = await companyHttpService.getCompanies(queryParams);
    this.setState({companies: response});
  }
}

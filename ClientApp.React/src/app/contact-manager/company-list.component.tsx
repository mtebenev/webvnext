import * as React from 'react';
import {UserManager} from 'oidc-client';
import List, {ListItem, ListItemText} from 'material-ui/List';

import {CompanyHttpService, ICompanyQueryParamsDto} from '@http-services/contact-manager/company-http.service';

interface IProps {
  userManager: UserManager;
}

interface IState {
  companies: any[];
}

export class CompanyListComponent extends React.Component<IProps, IState> {

  private _companies: any[] = [
    {name: 'item 1'},
    {name: 'item 2'}
  ];

  public render(): React.ReactNode {
    return (
      <div>
        <div>I am company list</div>
        <button onClick={e => this.handleGetCompaniesClick()}>Get Companies</button>

        <List>
          {
            this._companies.map(c => (
              <ListItem button={true}>
                <ListItemText primary={c.name}/>
              </ListItem>
            ))
          }
        </List>
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

    alert('got response: ' + JSON.stringify(response));
  }
}

import * as React from 'react';
import axios from 'axios';
import {AxiosRequestConfig} from 'axios';
import {UserManager} from 'oidc-client';
import List, {ListItem, ListItemText} from 'material-ui/List';

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

    let user = await this.props.userManager.getUser();
    console.error('got token: ' + user.access_token);

    let config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + user.access_token
      }
    };

    let response = await axios.get('http://localhost:5200/api/companies?pageNumber=0&pageSize=20', config);

    alert('got response: ' + JSON.stringify(response));
  }
}

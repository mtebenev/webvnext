import * as React from 'react';
import axios from 'axios';
import {AxiosRequestConfig} from 'axios';
import {UserManager} from 'oidc-client';

interface IProps {
  userManager: UserManager;
}

export class CompanyListComponent extends React.Component<IProps> {

  public render(): React.ReactNode {
    return (
      <div>
        <div>I am company list</div>
        <button onClick={e => this.handleGetCompaniesClick()}>Get Companies</button>
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

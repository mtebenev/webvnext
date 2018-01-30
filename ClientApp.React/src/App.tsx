import * as React from 'react';
import { UserManager, UserManagerSettings } from 'oidc-client';
import axios from 'axios';
import { AxiosRequestConfig } from 'axios';

import './App.css';

const logo = require('./logo.svg');

class App extends React.Component {
  private _accessToken: string;

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={e => this.handleLoginClick()}>Login</button>
        <button onClick={e => this.handleGetCompaniesClick()}>Get Companies</button>
      </div>
    );
  }

  /**
   * Invoked when user clicks login button
   */
  public async handleLoginClick(): Promise<void> {
    alert('login');

    let settings: UserManagerSettings = {
      authority: 'http://localhost:3200',
      client_id: 'reactclient',
      redirect_uri: 'http://localhost:3000',
      response_type: 'id_token token',
      scope: 'openid profile api1',
      silent_redirect_uri: 'http://localhost:3000'
    };
    let userManager = new UserManager(settings);

    if (window.location.hash) {

      let user = await userManager.signinRedirectCallback();
      alert('logged in: ' + JSON.stringify(user));
      this._accessToken = user.access_token;
    } else {
      userManager.signinRedirect();
    }
  }

  public async handleGetCompaniesClick(): Promise<void> {

    let config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this._accessToken
      }
    };

    let response = await axios.get('http://localhost:5200/api/companies?pageNumber=0&pageSize=20', config);

    alert('got response: ' + JSON.stringify(response));
  }
}

export default App;

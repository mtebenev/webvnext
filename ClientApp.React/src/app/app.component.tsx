import * as React from 'react';
import {UserManager, UserManagerSettings} from 'oidc-client';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Redirect} from 'react-router';

import {CompanyListComponent} from './contact-manager/company-list.component';
import {ContactListComponent} from './contact-manager/contact-list.component';
import {AuthorizationComponent} from './shared/authorization.component';

import './app.component.scss';

export class AppComponent extends React.Component {
  private _userManager: UserManager;

  constructor() {
    super({});

    let settings: UserManagerSettings = {
      authority: 'http://localhost:3200',
      client_id: 'reactclient',
      redirect_uri: 'http://localhost:3000',
      response_type: 'id_token token',
      scope: 'openid profile api1',
      silent_redirect_uri: 'http://localhost:3000'
    };

    this._userManager = new UserManager(settings);

  }

  render() {
    return (
      <div className="App">
        <div>
          <Router>
            <div>
              <ul>
                <li><Link to="/companies">Companies</Link></li>
                <li><Link to="/contacts">Contacts</Link></li>
              </ul>

              <hr />

              <AuthorizationComponent userManager={this._userManager}>
                <Route exact={true} path="/" render={() => (<Redirect to="/companies" />)} />
                <Route path="/companies" render={() => (<CompanyListComponent userManager={this._userManager}/>)} />
                <Route path="/contacts" component={ContactListComponent} />
              </AuthorizationComponent>
            </div>
          </Router>
        </div>

        <button onClick={e => this.handleLoginClick()}>Login</button>
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

    if(window.location.hash) {

      let user = await userManager.signinRedirectCallback();
      alert('logged in: ' + JSON.stringify(user));
      //this._accessToken = user.access_token;
    } else {
      userManager.signinRedirect();
    }
  }
}

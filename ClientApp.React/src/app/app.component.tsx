import * as React from 'react';
import {UserManager, UserManagerSettings} from 'oidc-client';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {Redirect} from 'react-router';

import {CompanyListComponent, ContactListComponent, CompanyDetailsComponent} from './contact-manager/index';
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

  /**
   * Note: see discussion on properly passing props with router: https://github.com/ReactTraining/react-router/issues/4105
   * TODOA
   */
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
                <Switch>
                  <Route exact={true} path="/" render={() => (<Redirect to="/companies" />)} />
                  <Route path="/companies/:companyId" render={props => (<CompanyDetailsComponent {...props} userManager={this._userManager} />)} />
                  <Route path="/companies" render={() => (<CompanyListComponent userManager={this._userManager} />)} />
                  <Route path="/contacts" component={ContactListComponent} />
                </Switch>
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

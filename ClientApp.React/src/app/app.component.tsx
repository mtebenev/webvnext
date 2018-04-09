import * as React from 'react';
import {UserManager, UserManagerSettings} from 'oidc-client';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import {Redirect} from 'react-router';
import {AppBar, Drawer, List, ListItem, ListItemText, Toolbar, Button, Icon, IconButton, Typography} from '@core/mui-exports';

import {ContactListComponent, CompaniesComponent} from './contact-manager/index';
import {AuthorizationComponent} from './shared/authorization.component';
import {IAppContext, AppContextTypes, TAppContextTypes} from './app-context';

import './app.component.scss';

export class AppComponent extends React.Component implements React.ChildContextProvider<IAppContext> {

  private _appContext: IAppContext;

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

    this._appContext = {
      userManager: new UserManager(settings)
    };
  }

  public static childContextTypes: TAppContextTypes = AppContextTypes;

  /**
   * React.ChildContextProvider
   */
  public getChildContext(): IAppContext {
    return this._appContext;
  }

  /**
   * Note: see discussion on properly passing props with router: https://github.com/ReactTraining/react-router/issues/4105
   * TODOA
   */
  render(): React.ReactNode {
    return (
      <div className="App">
        <div>
          <Router>
            <div>
              {this.renderAppSidebar()}
              <AppBar position="static">
                <Toolbar>
                  <IconButton>
                    <Icon>menu</Icon>
                  </IconButton>

                  <Typography variant="title" color="inherit">
                    Contact Manager
                  </Typography>
                  <Button color="inherit">Login</Button>
                </Toolbar>
              </AppBar>
              {this.renderAppContent()}
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

  /**
   * Renderes app sidebar
   */
  private renderAppSidebar(): React.ReactNode {
    return (
      <Drawer
        variant="permanent"
      >
        <List component="nav">
          <ListItem button={true} component={(props: any) => <Link to={`/companies`} {...props} />} >
            <ListItemText primary="Companies" />
          </ListItem>
          <ListItem button={true} component={(props: any) => <Link to={`/contacts`} {...props} />}>
            <ListItemText primary="Contacts" />
          </ListItem>
        </List>
      </Drawer>
    );
  }

  private renderAppContent(): React.ReactNode {
    return (
      <div className="container">
        <AuthorizationComponent>
          <Switch>
            <Route exact={true} path="/" render={() => (<Redirect to="/companies" />)} />
            <Route path="/companies" render={() => (<CompaniesComponent />)} />
            <Route path="/contacts" component={ContactListComponent} />
          </Switch>
        </AuthorizationComponent>
      </div>
    );
  }
}

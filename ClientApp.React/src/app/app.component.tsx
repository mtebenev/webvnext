import * as React from 'react';
import * as PropTypes from 'prop-types';
import {UserManager, UserManagerSettings} from 'oidc-client';
import {BrowserRouter as Router, Route, Link, Switch, BrowserRouter} from 'react-router-dom';
import {Redirect} from 'react-router';
import * as i18n from 'i18next'
import {AppBar, Drawer, List, ListItem, ListItemText, Toolbar, Button, Icon, IconButton, Typography, WithStyles} from '@core/mui-exports';
import {MuiWithStyles} from '@core/mui-decorators';

import {ContactListComponent, CompaniesComponent} from './contact-manager/index';
import {AuthorizationComponent} from './shared/authorization.component';
import {ConfirmationDialogComponent} from './shared/confirmation-dialog.component';
import {ConfirmationUiService} from '@app-services/confirmation-ui.service';
import {ConfirmationUi} from '@app-services/confirmation-ui';
import {IAppContext, AppContextTypes, TAppContextTypes} from './app-context';
import {Deferred} from '@common/index';
import {FxContainer} from '@layout/fx-container';
import {FxFill} from '@layout/fx-fill';

import './app.component.scss';

interface IIntlContext {
  i18n: i18n.i18n;
}

interface IState {
  isTranslationLoaded: boolean;
}

const styles: any = (theme: any) => ({
  drawerPaper: {
    position: 'relative',
    width: 300,
  }
});

@MuiWithStyles(styles)
export class AppComponent extends React.Component<React.HTMLProps<any> & WithStyles<'root'>, IState> implements React.ChildContextProvider<IAppContext> {

  private _deferredConfirmationUi: Deferred<ConfirmationUi>;
  private _appContext: IAppContext;
  private _setConfirmationDialogRef: (element: ConfirmationDialogComponent) => void;

  public static contextTypes: PropTypes.ValidationMap<IIntlContext> = {
    i18n: PropTypes.object
  };

  constructor(props: any, context: IIntlContext) {
    super(props);

    // Note: we can't create confirmation UI unitil rendering (we are waiting for ref).
    this._deferredConfirmationUi = new Deferred<ConfirmationUi>();
    this._setConfirmationDialogRef = element => {
      this.createConfirmationUi(element);
    }

    context.i18n.on('initialized', (options: i18n.InitOptions) => {
      this.setState({isTranslationLoaded: true});
    });

    let settings: UserManagerSettings = {
      authority: process.env.REACT_APP_IDENTITY_SERVER_URL,
      client_id: process.env.REACT_APP_IDENTITY_CLIENT_ID,
      redirect_uri: process.env.REACT_APP_IDENTITY_CLIENT_BASE_URL,
      response_type: 'id_token token',
      scope: 'openid profile api1',
      silent_redirect_uri: `${process.env.REACT_APP_IDENTITY_CLIENT_BASE_URL}`
    };

    this._appContext = {
      userManager: new UserManager(settings),
      confirmationUi: this._deferredConfirmationUi.promise
    };

    this.state = {isTranslationLoaded: false};
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
  public render(): React.ReactNode {

    return (
      <React.Fragment>{this.state.isTranslationLoaded &&
        <React.Fragment>
          <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASENAME}>
            <FxContainer
              flexFill={true}
              layout="column"
              layoutAlign="start stretch"
            >
              {this.renderAppBar()}
              <FxContainer
                layout="row"
                layoutAlign="start stretch"
                style={{flexGrow: 1, flexShrink: 1}}
              >
                {this.renderAppSidebar()}
                {this.renderAppContent()}
              </FxContainer>
            </FxContainer>
          </BrowserRouter>
          <ConfirmationDialogComponent ref={this._setConfirmationDialogRef} />
        </React.Fragment>
      }
      </React.Fragment>
    );
  }

  /**
   * Renderes app sidebar
   */
  private renderAppSidebar(): React.ReactNode {

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: this.props.classes['drawerPaper']
        }}
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

  /**
   * Renders main application toolbar
   */
  private renderAppBar(): React.ReactNode {
    return (
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
    );
  }

  private renderAppContent(): React.ReactNode {
    return (
      <div className="container">
        <FxFill>
          <AuthorizationComponent>
            <Switch>
              <Route exact={true} path="/" render={() => (<Redirect to="/companies" />)} />
              <Route path="/companies" render={(props) => (<CompaniesComponent {...props} />)} />
              <Route path="/contacts" component={ContactListComponent} />
            </Switch>
          </AuthorizationComponent>
        </FxFill>
      </div>
    );
  }

  private createConfirmationUi(confirmationDialog: ConfirmationDialogComponent): void {
    if(confirmationDialog) {
      let confirmationUiService = new ConfirmationUiService(confirmationDialog);
      this._deferredConfirmationUi.resolve(confirmationUiService);
    }
  }
}

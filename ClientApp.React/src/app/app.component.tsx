import * as React from 'react';
import {UserManager, UserManagerSettings} from 'oidc-client';
import {BrowserRouter as Router, Route, Link, Switch, BrowserRouter} from 'react-router-dom';
import {Redirect} from 'react-router';
import {
  AppBar, Drawer, List, ListItem, ListItemText, Toolbar, Button, Icon, IconButton, Typography,
  Theme, Hidden, StyleRulesCallback, StyledComponentProps
} from '@core/mui-exports';
import {ApplyStyles} from '@core/mui-decorators';

import {ContactListComponent, CompaniesComponent} from './contact-manager/index';
import {AuthorizationComponent} from './shared/authorization.component';
import {ConfirmationDialogComponent} from './shared/confirmation-dialog.component';
import {ConfirmationUiService} from '@app-services/confirmation-ui.service';
import {ConfirmationUi} from '@app-services/confirmation-ui';
import {IAppContext, AppContextTypes, TAppContextTypes} from './app-context';
import {Deferred} from '@common/index';
import {FxContainer} from '@layout/fx-container';
import {FxFill} from '@layout/fx-fill';

interface IState {
  isMobileDrawerOpen: boolean;
}

const styles: StyleRulesCallback = (theme: Theme) => ({
  drawerPaperDesktop: {
    position: 'relative',
    width: 300,
    height: '100%'
  },
  drawerPaperMobile: {
    width: 300,
    height: '100%'
  },
  navIcon: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
});

@ApplyStyles(styles)
export class AppComponent extends React.Component<
React.HTMLProps<any> & StyledComponentProps<keyof typeof styles>,
IState>
  implements React.ChildContextProvider<IAppContext> {

  private _deferredConfirmationUi: Deferred<ConfirmationUi>;
  private _appContext: IAppContext;
  private _setConfirmationDialogRef: (element: ConfirmationDialogComponent) => void;

  constructor(props: any) {
    super(props);

    // Note: we can't create confirmation UI unitil rendering (we are waiting for ref).
    this._deferredConfirmationUi = new Deferred<ConfirmationUi>();
    this._setConfirmationDialogRef = element => {
      this.createConfirmationUi(element);
    }

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

    this.state = {
      isMobileDrawerOpen: false
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
   */
  public render(): React.ReactNode {

    return (
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
              {this.renderDrawerContainers()}
              <div style={{width: '100%'}}>
                {this.renderAppContent()}
              </div>
            </FxContainer>
          </FxContainer>
        </BrowserRouter>
        <ConfirmationDialogComponent ref={this._setConfirmationDialogRef} />
      </React.Fragment>
    );
  }

  /**
   * Renderes app sidebar
   */
  private renderAppSidebar(): React.ReactNode {

    return (
      <List component="nav">
        <ListItem button={true} component={(props: any) => <Link to={`/companies`} {...props} />} >
          <ListItemText primary="Companies" />
        </ListItem>
        <ListItem button={true} component={(props: any) => <Link to={`/contacts`} {...props} />}>
          <ListItemText primary="Contacts" />
        </ListItem>
      </List>
    );
  }

  /**
   * Renders main application toolbar
   */
  private renderAppBar(): React.ReactNode {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => this.handleMobileDrawerToggle()}
            className={this.props.classes!['navIcon']}
          >
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

  /**
   * Renders responsive containers for sidebar drawer
   * We have two: one permanent for large screens and the seond temporary for mobiles/tablets
   */
  private renderDrawerContainers(): React.ReactNode {
    return (
      <React.Fragment>
        <Hidden mdUp={true}>
          <Drawer
            variant="temporary"
            open={this.state.isMobileDrawerOpen}
            onClose={() => this.handleMobileDrawerToggle()}
            classes={{
              paper: this.props.classes!['drawerPaperMobile']
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {this.renderAppSidebar()}
          </Drawer>
        </Hidden>
        <Hidden smDown={true} implementation="css">
          <Drawer
            style={{height: '100%'}}
            variant="permanent"
            open={true}
            classes={{
              paper: this.props.classes!['drawerPaperDesktop']
            }}
          >
            {this.renderAppSidebar()}
          </Drawer>
        </Hidden>
      </React.Fragment>
    );
  }

  private renderAppContent(): React.ReactNode {
    return (
      <FxFill>
        <AuthorizationComponent>
          <Switch>
            <Route exact={true} path="/" render={() => (<Redirect to="/companies" />)} />
            <Route path="/companies" render={(props) => (<CompaniesComponent {...props} />)} />
            <Route path="/contacts" component={ContactListComponent} />
          </Switch>
        </AuthorizationComponent>
      </FxFill>
    );
  }

  private createConfirmationUi(confirmationDialog: ConfirmationDialogComponent): void {
    if(confirmationDialog) {
      let confirmationUiService = new ConfirmationUiService(confirmationDialog);
      this._deferredConfirmationUi.resolve(confirmationUiService);
    }
  }

  /**
   * Toggle mobile drawer
   */
  private handleMobileDrawerToggle(): void {
    this.setState({...this.state, isMobileDrawerOpen: !this.state.isMobileDrawerOpen});
  }
}

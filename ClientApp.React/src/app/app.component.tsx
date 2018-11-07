import * as React from 'react';
import {UserManager, UserManagerSettings} from 'oidc-client';
import {BrowserRouter as Router, Route, Switch, BrowserRouter} from 'react-router-dom';
import {Redirect} from 'react-router';
import {
  Drawer, Theme, Hidden, createStyles, WithStyles, withStyles
} from '@core/mui-exports';

import {ContactListComponent, CompaniesComponent} from './contact-manager/index';
import {AuthorizationComponent} from './shared/authorization.component';
import {ConfirmationDialogComponent} from './shared/confirmation-dialog.component';
import {IAppContext, AppContext} from './app-context';
import {Deferred} from '@common/index';
import {FxContainer} from '@layout/fx-container';
import {FxFill} from '@layout/fx-fill';
import {PortalManagerService, ConfirmationUi, ConfirmationUiService} from '@app-services/index';
import {AppPortalContainer} from '@core/ui/app-portal-container';
import {UiConstants} from '@core/ui/ui-constants';
import {AppSidebar} from '@core/components/app-sidebar';
import {AppHeader} from '@core/components/app-header';
import {IAppCommands} from '@core/iapp-commands';

interface IState {
  isMobileDrawerOpen: boolean;
}

const styles = (theme: Theme) => createStyles({
  drawerPaperDesktop: {
    position: 'relative',
    width: UiConstants.APP_SIDEBAR_WIDTH,
    height: '100%'
  },
  drawerPaperMobile: {
    width: UiConstants.APP_SIDEBAR_WIDTH,
    height: '100%'
  }
});

type TProps = WithStyles<typeof styles>;

class AppComponentImpl extends React.Component<TProps, IState> implements IAppCommands {

  private _deferredConfirmationUi: Deferred<ConfirmationUi>;
  private _appContext: IAppContext;
  private _setConfirmationDialogRef: (element: ConfirmationDialogComponent) => void;

  constructor(props: TProps) {
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

    // Initialize app context
    this._appContext = {
      userManager: new UserManager(settings),
      confirmationUi: this._deferredConfirmationUi.promise,
      portalManager: new PortalManagerService(),
      appCommands: this
    };

    this.state = {
      isMobileDrawerOpen: false
    };
  }

  /**
   * IAppCommands
   */
  public toggleAppMenu(): void {
    this.setState({...this.state, isMobileDrawerOpen: !this.state.isMobileDrawerOpen});
  }

  /**
   * IAppCommands
   */
  public logOut(): void {
    this._appContext.userManager.signoutRedirect();
  }

  /**
   * Note: see discussion on properly passing props with router: https://github.com/ReactTraining/react-router/issues/4105
   */
  public render(): React.ReactNode {

    return (
      <React.Fragment>
        <AppContext.Provider value={this._appContext}>
          <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASENAME}>
            <FxContainer
              flexFill={true}
              layout="column"
              layoutAlign="start stretch"
            >
              <AppPortalContainer name={UiConstants.PORTAL_FAB} portalManager={this._appContext.portalManager} />
              <AppHeader/>
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
        </AppContext.Provider>
      </React.Fragment>
    );
  }

  /**
   * Renders responsive containers for sidebar drawer
   * We have two: one permanent for large screens and the seond temporary for mobiles/tablets
   */
  private renderDrawerContainers(): React.ReactNode {
    return (
      <React.Fragment>
        {/* Mobile drawer: temporary */}
        <Hidden mdUp={true}>
          <Drawer
            variant="temporary"
            open={this.state.isMobileDrawerOpen}
            onClose={() => this.handleMobileDrawerToggle()}
            classes={{
              paper: this.props.classes.drawerPaperMobile
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <AppSidebar/>
          </Drawer>
        </Hidden>

        {/* Desktop drawer: permanent */}
        <Hidden smDown={true} implementation="css">
          <Drawer
            style={{height: '100%'}}
            variant="permanent"
            open={true}
            classes={{
              paper: this.props.classes.drawerPaperDesktop
            }}
          >
            <AppSidebar />
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
    this.toggleAppMenu();
  }
}

export const AppComponent = withStyles(styles)(AppComponentImpl);

import * as React from 'react';
import {UserManager} from 'oidc-client';
import {ConfirmationUi} from '@app-services/confirmation-ui';
import {PortalManagerService} from '@app-services/portal-manager.service';

/**
 * Common React context used through the application
 */
export interface IAppContext {
  userManager: UserManager;
  confirmationUi: Promise<ConfirmationUi>;
  portalManager: PortalManagerService;
}

export interface IAppContextProps {
  appContext: IAppContext;
}

export const AppContext = React.createContext<IAppContext | {}>({});

/**
 * HOC for app context injection
 * TODO MTE: rewrite with generic + fix return any
 */
export function withAppContext<C extends React.ComponentClass>(Component: C): any {
  return ((props: any) => (
    <AppContext.Consumer>
      {context => <Component {...props} appContext={context} />}
    </AppContext.Consumer>)) as any
}

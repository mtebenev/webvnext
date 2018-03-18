import * as React from 'react';

import {IAppContext, AppContextTypes, TAppContextTypes} from '../app-context';

interface IAuthorizationComponentState {
  isSignedIn: boolean;
}

/**
 * Use as container for view requiring authorized access
 */
export class AuthorizationComponent extends React.Component<React.Props<any>, IAuthorizationComponentState> {

  private _appContext: IAppContext;

  public static contextTypes: TAppContextTypes = AppContextTypes;

  constructor(props: React.Props<any>, context: IAppContext) {

    super(props);

    this._appContext = context;
    this.state = {isSignedIn: false};
  }

  /**
   * ComponentLifecycle
   */
  public componentDidMount(): void {

    if(window.location.hash) {
      console.error('detected hash, performing sign in callback');

      this._appContext.userManager.signinRedirectCallback().then(user => {

        console.error('auth component got callback response, changing state');
        this.setState({isSignedIn: true});
      });
    } else {
      this._appContext.userManager.getUser().then(user => {

        if(!user) {
          console.error('No user detected, performing sign in redirect');
          this._appContext.userManager.signinRedirect();
        } else {
          this.setState({isSignedIn: true});
        }

      });
    }
  }

  /**
   * Component
   */
  public render(): React.ReactNode {
    console.error('AthorizationComponent.render()');
    if(this.state.isSignedIn) {
      if(!this.props.children) {
        console.error('render: authenticated but no children');
        return (null);
      } else {
        return this.props.children
      }
    } else {
      return (
        <div>
          <div>Signed in: {this.state.isSignedIn.toString()}</div>
        </div>
      )
    }
  }
}

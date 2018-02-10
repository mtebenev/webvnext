import * as React from 'react';
import {UserManager} from 'oidc-client';

interface IAuthorizationComponentProps {
  userManager: UserManager;
}

interface IAuthorizationComponentState {
  isSignedIn: boolean;
}

/**
 * Use as container for view requiring authorized access
 */
export class AuthorizationComponent extends React.Component<IAuthorizationComponentProps, IAuthorizationComponentState> {

  private _userManager: UserManager;

  constructor(props: IAuthorizationComponentProps) {

    super(props);

    this._userManager = props.userManager;
    this.state = {isSignedIn: false};
  }

  /**
   * ComponentLifecycle
   */
  public componentDidMount(): void {

    if(window.location.hash) {
      console.error('detected hash, performing sign in callback');

      this._userManager.signinRedirectCallback().then(user => {

        console.error('auth component got callback response, changing state');
        this.setState({isSignedIn: true});
      });
    } else {
      this._userManager.getUser().then(user => {

        if(!user) {
          console.error('No user detected, performing sign in redirect');
          this._userManager.signinRedirect();
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

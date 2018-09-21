import * as React from 'react';

import {IAppContextProps, withAppContext} from '../app-context';

interface IState {
  isSignedIn: boolean;
}

/**
 * Use as container for view requiring authorized access
 */
class AuthorizationComponentImpl extends React.Component<IAppContextProps, IState> {

  constructor(props: IAppContextProps) {

    super(props);
    this.state = {isSignedIn: false};
  }

  /**
   * ComponentLifecycle
   */
  public componentDidMount(): void {

    if(window.location.hash) {
      console.error('detected hash, performing sign in callback');

      this.props.appContext.userManager.signinRedirectCallback().then(user => {

        console.error('auth component got callback response, changing state');
        this.setState({isSignedIn: true});
      });
    } else {
      this.props.appContext.userManager.getUser().then(user => {

        if(!user) {
          console.error('No user detected, performing sign in redirect');
          this.props.appContext.userManager.signinRedirect();
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

export const AuthorizationComponent = withAppContext(AuthorizationComponentImpl);

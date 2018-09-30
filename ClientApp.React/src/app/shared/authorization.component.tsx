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

      this.props.appContext.userManager.signinRedirectCallback().then(user => {
        this.setState({isSignedIn: true});
      });
    } else {

      this.props.appContext.userManager.getUser().then(user => {

        if(!user || user.expired)
          this.props.appContext.userManager.signinRedirect();
        else
          this.setState({isSignedIn: true});

      });
    }
  }

  /**
   * Component
   */
  public render(): React.ReactNode {

    if(this.state.isSignedIn) {
      if(!this.props.children) {
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

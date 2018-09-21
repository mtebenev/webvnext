import * as React from 'react';
import Portal from '@material-ui/core/Portal';
import {IAppContextProps, withAppContext} from '../../app-context';

interface IProps {

  /**
   * Name of the portal container
   */
  name: string;
}

interface IState {
  container: React.ReactInstance;
}

type TProps = IProps & IAppContextProps;

class AppPortalImpl extends React.Component<TProps, IState> {

  constructor(props: TProps) {
    super(props);

    this.state = {
      container: props.appContext.portalManager.getPortalContainer(props.name)
    };
  }

  /**
   * React.Component
   */
  public render(): React.ReactNode {
    return (
      <Portal container={this.state.container}>
        <React.Fragment>
          {this.props.children}
        </React.Fragment>
      </Portal>
    );
  }
}

export const AppPortal = withAppContext(AppPortalImpl);

import * as React from 'react';
import Portal from '@material-ui/core/Portal';
import {IAppContext} from '../../app-context';

interface IProps {

  /**
   * Name of the portal container
   */
  name: string;

  appContext: IAppContext;
}

interface IState {
  container: React.ReactInstance;
}

export class AppPortal extends React.Component<IProps, IState> {

  constructor(props: IProps) {
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

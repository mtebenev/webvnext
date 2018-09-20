import * as React from 'react';
import {PortalManagerService} from '@core/app-services';

interface IProps {

  /**
   * Name of the portal container
   */
  name: string;

  portalManager: PortalManagerService;
}

export class AppPortalContainer extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);

    props.portalManager.registerPortalContainer(props.name, this);
  }

  /**
   * React.Component
   */
  public render(): React.ReactNode {
    return (
      <React.Fragment/>
    );
  }
}

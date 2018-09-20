import * as React from 'react';

/**
 * Encapsulates named portals management
 */
export class PortalManagerService {
  private _portalContainers: {[key: string]: React.ReactInstance};

  constructor() {
    this._portalContainers = {};
  }

  /**
   * Use to register a portal container with specified name
   */
  public registerPortalContainer(name: string, portalContainer: any): void {

    if(this._portalContainers[name])
      throw new Error(`Portal container ${name} is already registered.`);

    this._portalContainers[name] = portalContainer;
  }

  /**
   * Use to obtain a portal container byname
   */
  public getPortalContainer(name: string): React.ReactInstance {

    if(!this._portalContainers[name])
      throw new Error(`No portal container ${name} found.`);

    return this._portalContainers[name];
  }
}

import {BasePortalOutlet, TemplatePortal} from '@angular/cdk/portal';

/**
 * Encapsulates named portals management
 */
export class PortalManagerService {

  private _portalOutlets: {[key: string]: BasePortalOutlet};

  constructor() {
    this._portalOutlets = {};
  }

  /**
   * Use to register a portal outlet with specified name
   */
  public registerPortalOutlet(name: string, portalOutlet: BasePortalOutlet): void {

    if(this._portalOutlets[name])
      throw new Error(`Portal outlet ${name} is already registered.`);

    this._portalOutlets[name] = portalOutlet;
  }

  public attachTemplatePortal(portalOutletName: string, templatePortal: TemplatePortal): void {

    if(!this._portalOutlets[portalOutletName])
      throw new Error(`No portal outlet ${portalOutletName} found.`);

    templatePortal.attach(this._portalOutlets[portalOutletName]);
  }
}

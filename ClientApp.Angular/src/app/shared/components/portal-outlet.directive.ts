import {Directive, Input, ViewContainerRef, OnInit, ComponentFactoryResolver} from '@angular/core';
import {PortalManagerService} from '@app-services/portal-manager.service';
import {CdkPortalOutlet} from '@angular/cdk/portal';

/**
 * Use to create named portal outlet
 */
@Directive({
  selector: '[app-portal-outlet]'
})
export class AppPortalOutletDirective extends CdkPortalOutlet implements OnInit {

  private _portalManagerService: PortalManagerService;

  constructor(portalManagerService: PortalManagerService, componentFactoryResolver: ComponentFactoryResolver, viewContainerRef: ViewContainerRef) {

    super(componentFactoryResolver, viewContainerRef);
    this._portalManagerService = portalManagerService;
  }

  @Input('app-portal-outlet')
  public portalOutletName?: string;

  /**
   * OnInit
   */
  public ngOnInit(): void {

    if(!this.portalOutletName)
      throw new Error('Portal outlet name should be set');

    this._portalManagerService.registerPortalOutlet(this.portalOutletName, this);
  }
}

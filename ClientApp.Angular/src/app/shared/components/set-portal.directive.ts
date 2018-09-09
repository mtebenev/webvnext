import {Directive, Input, TemplateRef, ViewContainerRef, OnInit} from '@angular/core';
import {PortalManagerService} from '@app-services/portal-manager.service';
import {TemplatePortal} from '@angular/cdk/portal';

@Directive({
  selector: '[set-portal]'
})
export class SetPortalDirective extends TemplatePortal implements OnInit {

  private _portalManagerService: PortalManagerService;

  constructor(portalManagerService: PortalManagerService, templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {

    super(templateRef, viewContainerRef);
    this._portalManagerService = portalManagerService;
  }

  @Input('set-portal')
  public portalOutletName?: string;

  /**
   * OnInit
   */
  public ngOnInit(): void {

    if(!this.portalOutletName)
      throw new Error('Portal outlet name should be set');

    this._portalManagerService.attachTemplatePortal(this.portalOutletName, this);
  }
}

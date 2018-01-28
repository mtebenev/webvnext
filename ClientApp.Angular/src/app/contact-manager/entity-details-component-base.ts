import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';

export enum ViewMode {
  None = 'none',
  View = 'view',
  Edit = 'edit',
  New = 'new'
}

/**
 * Base class for entity details components in the application
 */
export abstract class EntityDetailsComponentbase {

  private _viewMode: ViewMode;
  private _activatedRoute: ActivatedRoute;

  constructor(activatedRoute: ActivatedRoute) {

    this._activatedRoute = activatedRoute;
    this._viewMode = ViewMode.None;
  }

  /**
   * Bound current view mode
   */
  public get viewMode(): ViewMode {
    return this._viewMode;
  }

  /**
   * Should be called in ngOnInit
   */
  protected onInit(): void {

    this._activatedRoute.url
      .subscribe(url => {

        let routeSnapshot = this._activatedRoute.snapshot;
        this.onRouteChange(routeSnapshot);
      });
  }

  protected onRouteChange(routeSnapshot: ActivatedRouteSnapshot): void {

    let isEntityIdFound = this.isEntityIdInRoute(routeSnapshot);
    let lastUrlSegment = routeSnapshot.url.length > 0
      ? routeSnapshot.url[routeSnapshot.url.length - 1]
      : null;

    if(lastUrlSegment && lastUrlSegment.path === 'new') {
      this._viewMode = ViewMode.New;
    } else if(lastUrlSegment && lastUrlSegment.path === 'edit')
      this._viewMode = ViewMode.Edit;
    else if(isEntityIdFound)
      this._viewMode = ViewMode.View;

    this.onSwitchMode(this._viewMode, routeSnapshot);
}

  /**
   * Must be overridden in a derived class and check if an entity ID presents in the route
   */
  protected isEntityIdInRoute(routeSnapshot: ActivatedRouteSnapshot): boolean {
    throw new Error('EntityDetailsComponentbase.getEntityIdFromRoute() must be overridden');
  }

  /**
   * Must be overridden in derived class and create new instance of the entity whe
   */
  protected onSwitchMode(viewMode: ViewMode, routeSnapshot: ActivatedRouteSnapshot): Promise<void> {
    throw new Error('EntityDetailsComponentbase.onSwitchMode() must be overridden');
  }
}

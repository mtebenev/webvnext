import {Component, Input, OnInit, OnDestroy, Type} from '@angular/core';
import {ObservableMedia} from '@angular/flex-layout';
import {ActivatedRoute, Router} from '@angular/router';

import {ISubscription} from '@common/rxjs-imports';

/**
 * Displays a master and details components side by side (in desktop mode) or stacked (on mobiles)
 * Also check section Patterns at https://material.io/guidelines/layout/responsive-ui.html#responsive-ui-surface-behaviors
 */
@Component({
  selector: 'master-details',
  templateUrl: './master-details.component.html'
})
export class MasterDetailsComponent implements OnInit, OnDestroy {

  /**
   * Set flex-layout query for switching to the stacked layout
   * Check https://github.com/angular/flex-layout/wiki/Responsive-API for available queries
   */
  @Input()
  public stackedLayoutQuery: string;

  /**
   * Set route view suffix (i.e. 'companies') to let the component determine if current view is master
   */
  @Input()
  public masterRouteSuffix: string;

  /**
   * Bound master component type
   */
  @Input()
  public masterComponentType: Type<any>;

  private _showMasterView: boolean;
  private activatedRouteSubsription: ISubscription;

  constructor(private media: ObservableMedia, private activatedRoute: ActivatedRoute, private router: Router) {
    this.stackedLayoutQuery = 'lt-sm';
    this._showMasterView = false;
  }

  /**
   * OnInit
   */
  public ngOnInit(): void {

    this.activatedRouteSubsription = this.activatedRoute.url
      .subscribe(url => {
        if (this.masterRouteSuffix) {
          this._showMasterView = this.router.url.endsWith(this.masterRouteSuffix) ? true : false;
        }
      });

  }

  /**
   * OnDestroy
   */
  public ngOnDestroy(): void {
    if (this.activatedRouteSubsription)
      this.activatedRouteSubsription.unsubscribe();
  }

  /**
   * True if stacked layout (mobile) should be used
   */
  public get isStackedLayout(): boolean {
    return this.media.isActive(this.stackedLayoutQuery);
  }

  /**
   * Bound flag for displaying master view in stacked mode
   */
  public get showMasterView(): boolean {
    return this._showMasterView;
  }
}

import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

/**
 * Responsive container for company list (master view)
 */
@Component({
  templateUrl: './company-container-master.component.html'
})
export class CompanyContainerMasterComponent implements OnInit {

  private _showMasterView: boolean;

  /**
   * Set flex-layout query for switching to the stacked layout
   * Check https://github.com/angular/flex-layout/wiki/Responsive-API for available queries
   */
  @Input()
  public stackedLayoutQuery: string;

  constructor(private media: ObservableMedia, private activatedRoute: ActivatedRoute, private router: Router) {
    this.stackedLayoutQuery = 'lt-sm';
  }

  /**
   * True if stacked layout (mobile) should be used
   */
  public get isStackedLayout(): boolean {
    return this.media.isActive(this.stackedLayoutQuery);
  }

  public get showMasterView(): boolean {
    return this._showMasterView;
  }

  /**
   * OnInit
   */
  public ngOnInit(): void {

    this.activatedRoute.url
      .subscribe(url => {
        //alert('url changed: ' + JSON.stringify(url));
        //alert(this.router.url);
        this._showMasterView = this.router.url.endsWith('companies') ? true : false;
      });

  }
}

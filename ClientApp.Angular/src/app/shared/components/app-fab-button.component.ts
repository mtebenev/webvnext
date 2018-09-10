import {Component, Input} from '@angular/core';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';
import {Subscription} from '@common/rxjs-imports';

/**
 * Displays FAB button changing position depending on resolution (according to material guidelines)
 */
@Component({
  selector: 'app-fab-button',
  templateUrl: './app-fab-button.component.html',
  styleUrls: ['./app-fab-button.component.scss']
})
export class AppFabButtonComponent {

  private _isMobileMode: boolean;
  private _media: ObservableMedia;
  private _subscriptionMedia: Subscription;

  constructor(media: ObservableMedia) {

    this._media = media;

    // Listen to media change to redraw sidebar
    // Note MTE: in original Material sample there's ChangeDetectorRef used. Really need that?
    this._subscriptionMedia = media.subscribe((mediaChange: MediaChange) => {
      this._isMobileMode = this._media.isActive('lt-md');
    });

    this._isMobileMode = this._media.isActive('lt-sm'); // Initial layout
    alert(this._isMobileMode);
  }

  @Input()
  public routerLink?: string;

  /**
   * Bound flag for rendering layout for mobiles
   */
  public get isMobileMode(): boolean {
    return this._isMobileMode;
  }

  /**
   * OnDestroy
   */
  public ngOnDestroy(): void {

    if(this._subscriptionMedia) {
      this._subscriptionMedia.unsubscribe();
    }
  }
}

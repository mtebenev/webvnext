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

  private _media: ObservableMedia;
  private _subscriptionMedia: Subscription;
  private _fabButtonClass: string = '';

  constructor(media: ObservableMedia) {

    this._media = media;

    // Listen to media change to redraw sidebar
    // Note MTE: in original Material sample there's ChangeDetectorRef used. Really need that?
    this._subscriptionMedia = media.subscribe((mediaChange: MediaChange) => {
      this.updateFabButtonClass();
    });

    this.updateFabButtonClass();
  }

  @Input()
  public routerLink?: string;

  public get fabButtonClass(): string {
    return this._fabButtonClass;
  }

  /**
   * OnDestroy
   */
  public ngOnDestroy(): void {

    if(this._subscriptionMedia) {
      this._subscriptionMedia.unsubscribe();
    }
  }

  private updateFabButtonClass(): void {

    if(this._media.isActive('lt-sm'))
      this._fabButtonClass = 'fab-button-sm';
    else if(this._media.isActive('lt-lg'))
      this._fabButtonClass = 'fab-button-md';
    else
      this._fabButtonClass = 'fab-button-xl';
  }
}

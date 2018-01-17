import {Component, Output, EventEmitter} from '@angular/core';

import {ViewContextService} from '@app-services/view-context.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

  private _eventMenuButtonClick: EventEmitter<void>;

  constructor(private viewContextService: ViewContextService) {
    this._eventMenuButtonClick = new EventEmitter<void>();
  }

  /**
   * Fired when user clicks menu button on the header
   */
  @Output()
  public get onMenuButtonClick(): EventEmitter<void> {
    return this._eventMenuButtonClick;
  }

  /**
   * Bound module title
   */
  public get moduleTitle(): string {
    return this.viewContextService.moduleTitle;
  }

  /**
   * Invoked when user clicks menu button
   */
  public handleMenuButtonClick(): void {
    this._eventMenuButtonClick.emit();
  }
}

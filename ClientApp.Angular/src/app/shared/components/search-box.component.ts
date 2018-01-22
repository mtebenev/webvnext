import {Component, ViewChild, ElementRef} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

/**
 * Displays a confirmation message like standard confirm() but using Material components.
 * To be used with ConfirmationUi
 */
@Component({
  selector: 'search-box',
  templateUrl: './search-box.component.html',
  animations: [
    trigger('boxState', [
      state('inactive', style({
        width: '0px'
      })),
      state('active', style({
        width: '200px',
      })),
      transition('inactive => active', animate('150ms ease-in')),
      transition('active => inactive', animate('150ms ease-out'))
    ])
  ]
})
export class SearchBoxComponent {

  private _isActivated: boolean;

  constructor() {
    this._isActivated = false;
  }

  @ViewChild('inputElem') public inputElem: ElementRef;

  /**
   * Bound flag: true when the search box is focused and expanded
   */
  public get isActivated(): boolean {
    return this._isActivated;
  }

  /**
   * Bound state for animations
   */
  public get state(): string {
    return this._isActivated ? 'active' : 'inactive';
  }

  /**
   * Invoked when user clicks search button
   */
  public activate(isActivate: boolean): void {
    this._isActivated = isActivate;

    if(isActivate) {
      let elem: HTMLElement = this.inputElem.nativeElement;
      elem.focus();
    }
  }
}

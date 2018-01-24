import {Component, ViewChild, ElementRef} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

type InputBoxStates = 'active' | 'inactive';

/**
 * Displays a confirmation message like standard confirm() but using Material components.
 * To be used with ConfirmationUi
 * TODO MTE: animations are disabled until it break unit tests. Add [@boxState]="state" to mat-form-field to re-enable
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
  private _state: InputBoxStates;
  private _inputElem: ElementRef;

  constructor() {
    this._isActivated = false;
  }

  @ViewChild('inputElem')
  public get inputElem(): ElementRef {
    return this._inputElem;
  }
  public set inputElem(value: ElementRef) {
    this._inputElem = value;
    if(!value)
      this._state = 'inactive';
    else {
      this._state = 'active';
      value.nativeElement.focus();
    }
  }

  /**
   * Bound flag: true when the search box is focused and expanded
   */
  public get isActivated(): boolean {
    return this._isActivated;
  }

  /**
   * Bound state for animations
   */
  public get state(): InputBoxStates {
    return this._state;
  }

  /**
   * Invoked when user clicks search button
   */
  public activate(isActivate: boolean): void {
    this._isActivated = isActivate;
  }
}

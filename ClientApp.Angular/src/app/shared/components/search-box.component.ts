import {Component, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';

import {Subject, debounceTime, distinctUntilChanged} from '@common/rxjs-imports';

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
      transition('inactive => active', animate('50ms ease-in')),
      transition('active => inactive', animate('0ms'))
    ])
  ]
})
export class SearchBoxComponent {

  private _isActivated: boolean;
  private _state: InputBoxStates;
  private _inputElem: ElementRef;
  private readonly _valueChangeSubject: Subject<string>; // Wrap in observable to debound user's input

  constructor() {
    this._isActivated = false;
    this.textChanged = new EventEmitter<string>();
    this._valueChangeSubject = new Subject<string>();
    this.initDebouncing();
  }

  /**
   * Bound text value
   */
  public value: string;

  @ViewChild('inputElem')
  public get inputElem(): ElementRef {
    return this._inputElem;
  }
  public set inputElem(value: ElementRef) {
    this._inputElem = value;

    // Delay visual changes to avoid DOM change and thus expressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      if(value)
        value.nativeElement.focus();

      this._state = value ? 'active' : 'inactive';
    });
  }

  /**
   * Raised when user types a text in the search box
   */
  @Output()
  public readonly textChanged: EventEmitter<string>;

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
   * Invoked when user changes value in the text box
   */
  public handleValueChange(value: string): void {
    this._valueChangeSubject.next(value);
  }

  /**
   * Invoked when user clicks search button
   */
  public activate(isActivate: boolean): void {
    this._isActivated = isActivate;
  }

  private initDebouncing(): void {
    this._valueChangeSubject
      .pipe(debounceTime(250),
      distinctUntilChanged())
      .subscribe(value => {
        this.textChanged.emit(value);
      });
  }
}

import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';

import {SearchBoxComponent} from './search-box.component';

let fixture: ComponentFixture<SearchBoxComponent>;

describe('SearchBoxComponent', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        SearchBoxComponent,
      ],
      imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBoxComponent);
  }));

  it('Should not display search box when created', async () => {

    fixture.detectChanges();
    await fixture.whenRenderingDone();

    let searchButton = fixture.debugElement.query(By.css('button'));
    let textInput = fixture.debugElement.query(By.css('input'));

    expect(searchButton).toBeTruthy();
    expect(textInput).toBeFalsy();
  });

  it('Should display search box when user clicks search icon', async () => {

    fixture.detectChanges();
    await fixture.whenRenderingDone();

    let searchButton = fixture.debugElement.query(By.css('button'));
    searchButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    // Verify
    searchButton = fixture.debugElement.query(By.css('button'));
    let textInput = fixture.debugElement.query(By.css('input'));

    expect(searchButton).toBeFalsy();
    expect(textInput).toBeTruthy();
    expect(fixture.componentInstance.inputElem.nativeElement).toEqual(textInput.nativeElement); // Input elem must be injected
  });
});

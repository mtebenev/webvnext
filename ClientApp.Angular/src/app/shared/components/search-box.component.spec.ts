import {TestBed, async} from '@angular/core/testing';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';

import {TestingModuleBuilder} from '@testing/testing-module-builder';
import {SearchBoxComponent} from './search-box.component';

describe('SearchBoxComponent', () => {

  TestingModuleBuilder
    .create()
    .addImports(CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NoopAnimationsModule)
    .addDeclarations(SearchBoxComponent)
    .build();

  it('Should not display search box when created', async(async () => {

    let fixture = TestBed.createComponent(SearchBoxComponent);

    let searchButton = fixture.debugElement.query(By.css('button'));
    let textInput = fixture.debugElement.query(By.css('input'));

    expect(searchButton).toBeTruthy();
    expect(textInput).toBeFalsy();
  }));

  it('Should display search box when user clicks search icon', async(async () => {

    let fixture = TestBed.createComponent(SearchBoxComponent);

    let searchButton = fixture.debugElement.query(By.css('button'));
    searchButton.triggerEventHandler('click', {});

    await fixture.whenStable();

    // Verify
    searchButton = fixture.debugElement.query(By.css('button'));
    let textInput = fixture.debugElement.query(By.css('input'));

    expect(searchButton).toBeFalsy();
    expect(textInput).toBeTruthy();
    expect(fixture.componentInstance.inputElem.nativeElement).toEqual(textInput.nativeElement); // Input elem must be injected
  }));

  it('Should emit text entered in textbox', async(async () => {

    let fixture = TestBed.createComponent(SearchBoxComponent);
    fixture.componentInstance.activate(true);
    await fixture.whenStable();

    let expectedText: string = '';
    fixture.componentInstance.textChanged.subscribe((t: string) => {
      expectedText = t;
    });

    let textInput: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    textInput.value = 'test';
    textInput.dispatchEvent(new Event('input'));

    await fixture.whenStable();
    expect(expectedText).toEqual('test');

    textInput.value = 'another_value';
    textInput.dispatchEvent(new Event('input'));

    await fixture.whenStable();
    expect(expectedText).toEqual('another_value');
  }));
});

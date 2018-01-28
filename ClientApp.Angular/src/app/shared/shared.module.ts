import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import {
  MatAutocompleteModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatPaginatorModule, MatSelectModule, MatToolbarModule, MatSidenavModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MasterDetailsComponent, SetViewContextOptionsDirective, ConfirmationDialogComponent, SearchBoxComponent} from './components/index';

const angularModules = [
  CommonModule,
  FormsModule,
  RouterModule
];

const materialModules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  FlexLayoutModule
];

const sharedComponents = [
  MasterDetailsComponent,
  SetViewContextOptionsDirective,
  ConfirmationDialogComponent,
  SearchBoxComponent
];

@NgModule({
  declarations: [
    ...sharedComponents
  ],
  imports: [
    ...angularModules,
    ...materialModules,
    TranslateModule
  ],
  exports: [
    ...angularModules,
    ...materialModules,
    ...sharedComponents,
    TranslateModule
  ],
  entryComponents: [
    ConfirmationDialogComponent
  ]
})
export class SharedModule {
}

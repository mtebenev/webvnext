import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatSelectModule, MatListModule, MatPaginatorModule, MatIconModule,
  MatSidenavModule, MatDialogModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MasterDetailsComponent, SetViewContextOptionsDirective, ConfirmationDialogComponent} from './components/index';

const angularModules = [
  CommonModule,
  FormsModule,
  RouterModule
];

const materialModules = [
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  FlexLayoutModule
];

const sharedComponents = [
  MasterDetailsComponent,
  SetViewContextOptionsDirective,
  ConfirmationDialogComponent
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

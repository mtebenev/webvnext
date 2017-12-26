import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import {MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatSelectModule, MatListModule, MatPaginatorModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

const angularModules = [
  CommonModule,
  FormsModule,
  RouterModule
];

const materialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatSelectModule,
  MatListModule,
  MatPaginatorModule,
  FlexLayoutModule
];

@NgModule({
  declarations: [
  ],
  imports: [
    ...angularModules,
    ...materialModules,
    TranslateModule
  ],
  exports: [
    ...angularModules,
    ...materialModules,
    TranslateModule
  ]
})
export class SharedModule {
}

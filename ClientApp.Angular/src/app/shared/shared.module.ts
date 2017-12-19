import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {TranslateModule} from '@ngx-translate/core';

import {MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatSelectModule, MatListModule} from '@angular/material';

const angularModules = [
  CommonModule,
  FormsModule
];

const materialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatSelectModule,
  MatListModule,
];

@NgModule({
  imports: [
    ...angularModules,
    ...materialModules,
    TranslateModule
  ],
  exports: [
    ...angularModules,
    ...materialModules,
    TranslateModule
  ],
  declarations: []
})
export class SharedModule {
}

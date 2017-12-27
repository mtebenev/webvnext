import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import {MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatSelectModule, MatListModule, MatPaginatorModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MasterDetailsComponent} from './components/master-details.component';

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
    MasterDetailsComponent
  ],
  imports: [
    ...angularModules,
    ...materialModules,
    TranslateModule
  ],
  exports: [
    ...angularModules,
    ...materialModules,
    TranslateModule,
    MasterDetailsComponent
  ]
})
export class SharedModule {
}

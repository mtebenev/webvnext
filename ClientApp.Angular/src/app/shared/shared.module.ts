import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';

import {
  MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule, MatSelectModule, MatListModule, MatPaginatorModule, MatIconModule,
  MatSidenavModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {LayoutModule} from '@angular/cdk/layout';

import {MasterDetailsComponent} from './components/master-details.component';
import {SetViewContextOptionsDirective} from './components/set-view-context-options.directive';

const angularModules = [
  CommonModule,
  FormsModule,
  RouterModule
];

const materialModules = [
  MatButtonModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule,
  FlexLayoutModule,
  LayoutModule
];

const sharedComponents = [
  MasterDetailsComponent,
  SetViewContextOptionsDirective
]

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
  ]
})
export class SharedModule {
}

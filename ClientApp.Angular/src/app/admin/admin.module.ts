import {NgModule} from '@angular/core';

import {FileUploadModule} from 'ng2-file-upload';

import {SharedModule} from '../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';

import {AdminComponent, DataUploadComponent} from './index';

const moduleComponents = [
  AdminComponent,
  DataUploadComponent
];

@NgModule({
  declarations: [
    ...moduleComponents,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
    FileUploadModule
  ]
})
export class AdminModule {
}

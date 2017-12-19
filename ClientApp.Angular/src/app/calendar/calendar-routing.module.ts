import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes = [
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CalendarRoutingModule {
}

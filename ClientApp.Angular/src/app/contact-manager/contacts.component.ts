import {Component} from '@angular/core';

import {ContactListComponent} from './contact-list.component';

/**
 * Displays master/details for contact entity
 */
@Component({
  templateUrl: './contacts.component.html'
})
export class ContactsComponent {
  public masterComponentType = ContactListComponent;
}

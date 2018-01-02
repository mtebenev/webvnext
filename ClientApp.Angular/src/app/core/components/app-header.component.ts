import {Component} from '@angular/core';

import {ViewContextService} from '@app-services/view-context.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

  constructor(private viewContextService: ViewContextService) {
	}

	/**
	 * Bound module title
	 */
	public get moduleTitle(): string {
		return this.viewContextService.moduleTitle;
	}
}

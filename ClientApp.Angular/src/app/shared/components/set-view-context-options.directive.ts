import {Directive, Input, OnDestroy} from '@angular/core';

import {ViewContextService} from '@app-services/view-context.service';

@Directive({
  selector: 'set-view-context-options'
})
export class SetViewContextOptionsDirective implements OnDestroy  {

	constructor(private viewContextService: ViewContextService) {
	}

	@Input()
	public set moduleTitle(value: string) {
		this.viewContextService.moduleTitle = value;
	}

  public ngOnDestroy(): void {
  }
}

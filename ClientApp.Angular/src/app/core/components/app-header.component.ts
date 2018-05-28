import {Component, Input} from '@angular/core';

import {ViewContextService} from '@app-services/view-context.service';
import {IAppCommands} from '../../iapp-commands';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})
export class AppHeaderComponent {

  private _viewContextService: ViewContextService;
  private _appCommands?: IAppCommands;

  constructor(viewContextService: ViewContextService) {
    this._viewContextService = viewContextService;
  }

  @Input()
  public set appCommands(value: IAppCommands) {
    this._appCommands = value;
  }

  /**
   * Bound module title
   */
  public get moduleTitle(): string | undefined {
    return this._viewContextService.moduleTitle;
  }

  /**
   * Invoked when user clicks menu button
   */
  public handleMenuButtonClick(): void {
    this._appCommands!.toggleAppMenu();
  }

  /**
   * Invoked when user clicks logout button on the settings menu
   */
  public handleLogOutClick(): void {
    this._appCommands!.logOut();
  }
}

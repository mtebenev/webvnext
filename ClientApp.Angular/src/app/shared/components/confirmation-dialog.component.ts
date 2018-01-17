import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

import {TranslateService} from '@ngx-translate/core';

/**
 * Displays a confirmation message like standard confirm() but using Material components.
 * To be used with ConfirmationUi
 */
@Component({
  templateUrl: './confirmation-dialog.component.html'
})
export class ConfirmationDialogComponent {

  private _content: string;

  constructor(@Inject(MAT_DIALOG_DATA) bodyTranslationId: string, translateService: TranslateService) {

    this._content = translateService.instant(bodyTranslationId);
  }

  /**
   * Bound content
   */
  public get content(): string {
    return this._content;
  }
}

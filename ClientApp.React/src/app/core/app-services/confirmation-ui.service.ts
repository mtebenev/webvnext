import {ConfirmationUi} from './confirmation-ui';
import {ConfirmationDialogComponent} from '@shared/confirmation-dialog.component';

/**
 * Can ask user to confirm something
 */
export class ConfirmationUiService extends ConfirmationUi {

  private _confirmationDialog: ConfirmationDialogComponent;

  constructor(confirmationDialog: ConfirmationDialogComponent) {
    super();
    this._confirmationDialog = confirmationDialog;

  }

  public confirm(bodyTranslationId: string): Promise<boolean> {

    return this._confirmationDialog.open(bodyTranslationId);
  }
}

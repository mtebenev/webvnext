import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material';

import {ConfirmationUi} from './confirmation-ui';
import {ConfirmationDialogComponent} from '@shared/components/index';
import {Deferred} from '@common/deferred';


/**
 * Default implementation for confirmation UI
 */
@Injectable()
export class ConfirmationUiService extends ConfirmationUi {

  private _dialog: MatDialog;

  constructor(dialog: MatDialog) {
    super();

    this._dialog = dialog;
  }

  public confirm(bodyTranslationId: string): Promise<boolean> {

    let dialogRef = this._dialog.open(ConfirmationDialogComponent, {
      minWidth: 400,
      data: bodyTranslationId
    });

    let deferredResult = new Deferred<boolean>();
    dialogRef.afterClosed().subscribe(result => {
      deferredResult.resolve(result);
    });

    return deferredResult.promise;
  }
}

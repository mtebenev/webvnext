import {ConfirmationUi} from './confirmation-ui';

/**
 * Default implementation for confirmation UI
 */
export class ConfirmationUiService extends ConfirmationUi {

  public confirm(body: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}

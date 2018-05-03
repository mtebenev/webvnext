import * as React from 'react';

import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@core/mui-exports';
import {Deferred, IntlUtils} from '@common/index';


interface IState {
  text?: string;
  isOpen: boolean;
}

/**
 * Can ask user to confirm something
 */
export class ConfirmationDialogComponent extends React.Component<React.HTMLProps<any>, IState> {

  private _deferredResult: Deferred<boolean>;

  constructor() {
    super({});

    this.state = {isOpen: false};
  }

  /**
   * React.Component
   */
  public render(): React.ReactNode {

    return (
      <Dialog open={this.state.isOpen}>
        <DialogContent>
          <DialogContentText>
            {this.state.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => this.handleButtonClick(true)}>
            {IntlUtils.t('COMMON.BUTTONS.OK')}
          </Button>
          <Button color="primary" onClick={() => this.handleButtonClick(false)}>
            {IntlUtils.t('COMMON.BUTTONS.CANCEL')}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  /**
   * Call to open the dialog
   */

  public open(bodyTranslationId: string): Promise<boolean> {

    this._deferredResult = new Deferred<boolean>();
    let text = IntlUtils.t(bodyTranslationId)
    this.setState({isOpen: true, text: text});

    return this._deferredResult.promise;
  }

  private handleButtonClick(result: boolean): void {
    if(!this._deferredResult)
      throw new Error('Unexpected: deferred is not defined');

    this.setState({isOpen: false});
    this._deferredResult.resolve(result);
  }
}

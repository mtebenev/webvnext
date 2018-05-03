import * as React from 'react';
import {translate, InjectedTranslateProps} from 'react-i18next';

import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button} from '@core/mui-exports';
import {Deferred} from '@common/deferred';

interface IProps {
}

interface IState {
  text?: string;
  isOpen: boolean;
}

/**
 * Can ask user to confirm something
 */
export class ConfirmationDialogComponent extends React.Component<IProps, IState> {

  private _deferredResult: Deferred<boolean>;

  constructor(props: IProps) {
    super(props);

    this.state = {isOpen: false};
  }

  /**
   * React.Component
   */
  public render(): React.ReactNode {

    return (
      <Dialog open={this.state.isOpen}>
        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.state.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => this.handleButtonClick(true)}>
            OK
            </Button>
          <Button color="primary" onClick={() => this.handleButtonClick(false)}>
            Cancel
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
    this.setState({isOpen: true, text: bodyTranslationId});

    return this._deferredResult.promise;
  }

  private handleButtonClick(result: boolean): void {
    if(!this._deferredResult)
      throw new Error('Unexpected: deferred is not defined');

    this.setState({isOpen: false});
    this._deferredResult.resolve(result);
  }
}

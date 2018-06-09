import * as React from 'react';
import {Icon, IconButton, Input, InputAdornment} from '@core/mui-exports';

interface IProps {

  /**
   * Fired when user changes text in the search box
   */
  onTextChanged: (value: string) => void;
}

interface IState {
  isActivated: boolean;
  value?: string;
}

/**
 * Displays expandable search box
 */
export class SearchBox extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {isActivated: false};
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        {!this.state.isActivated &&
          <IconButton onClick={() => this.activate(true)} >
            <Icon>search_icon</Icon>
          </IconButton>
        }
        {this.state.isActivated &&
          <Input
            onChange={event => this.handleTextChange(event)}
            value={this.state.value}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => this.handleResetClick()}
                >
                  <Icon>close_icon</Icon>
                </IconButton>
              </InputAdornment>
            }
          />
        }
      </React.Fragment >
    );
  }

  /**
   * Invoked when user clicks search button
   */
  private activate(isActivate: boolean): void {
    this.setState({...this.state, isActivated: isActivate});
  }

  /**
   * Invoked when user clicks cross icon on search box
   */
  private handleResetClick(): void {
    this.setState({...this.state, value: ''});
    this.activate(false);
  }

  /**
   * Invoked when user changes text in the box
   */
  private handleTextChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    this.props.onTextChanged(event.target.value);
  }
}

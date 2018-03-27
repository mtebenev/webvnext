import * as React from 'react';

interface IProps extends React.HTMLProps<any> {
}

interface IState {
}

/**
 * Creates a new company
 */
export class CompanyNewComponent extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  /**
   * React.Component
   */
  public render(): React.ReactNode {
    return (
      <div style={this.props.style}>
        NEW COMPANY
      </div>
    );
  }
}


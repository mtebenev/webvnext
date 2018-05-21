import * as React from 'react';

export class FxFill extends React.Component<React.HTMLProps<FxFill>> {

  public render(): React.ReactNode {

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          ...this.props.style
        }}
      >
        {this.props.children}
      </div>
    )
  }

}

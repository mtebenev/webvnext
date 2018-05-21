import * as React from 'react';

interface IProps {
  /**
   * Use to set up width and height to 100%
   */
  flexFill?: boolean;
}

export class FxFlex extends React.Component<IProps & React.HTMLProps<FxFlex>> {

  public render(): React.ReactNode {

    return (
      <div
        style={{
          width: this.props.flexFill ? '100%' : undefined,
          height: this.props.flexFill ? '100%' : undefined,
          //minHeight: '100%',
          flexGrow: 1,
          flexShrink: 1,
          ...this.props.style
        }}
      >
        {this.props.children}
      </div>
    )
  }

}

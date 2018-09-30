import * as React from 'react';

interface IProps {
  margin?: '1' | '2';
}

export class MaterialBox extends React.Component<IProps & React.HTMLProps<MaterialBox>> {

  public render(): React.ReactNode {

    return (
      <div
        style={{
          margin: 8,
          ...this.props.style
        }}
      >
        {this.props.children}
      </div>
    )
  }

}

import * as React from 'react';
import * as CSS from 'csstype';

interface IProps {
  /**
   * Use to set up width and height to 100%
   */
  flexFill?: boolean;
  layout?: 'column' | 'row';
  layoutAlign?: string;
}

export class FxContainer extends React.Component<IProps & React.HTMLProps<FxContainer>> {

  public render(): React.ReactNode {

    let justifyContent: CSS.JustifyContentProperty | undefined = undefined;
    let alignContent: CSS.AlignContentProperty | undefined = undefined;

    if(this.props.layoutAlign) {
      let tokens = this.props.layoutAlign.split(' ');
      if(tokens && tokens.length > 0) {
        justifyContent = 'flex-start';
      }

      if(tokens && tokens.length > 1) {
        alignContent = 'stretch';
      }
    }



    return (
      <div
        style={{
          width: this.props.flexFill ? '100%' : undefined,
          height: this.props.flexFill ? '100%' : undefined,
          display: 'flex',
          //minHeight: '100%',
          flexDirection: this.props.layout,
          justifyContent: justifyContent ? justifyContent : undefined,
          alignContent: alignContent ? alignContent : undefined,
          ...this.props.style
        }}
      >
        {this.props.children}
      </div>
    )
  }

}

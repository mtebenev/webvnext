import * as React from 'react';
import {Link} from 'react-router-dom';

import {Button, Icon, zIndex} from '@core/mui-exports';
import {MediaQueryGtSm, MediaQueryLtMd} from '@core/ui/media-query-alias';
import {UiConstants} from '@core/ui/ui-constants';

interface IProps {
  toUrl: string;
}

/**
 * Displays FAB button changing position depending on resolution (according to material guidelines)
 */
export class AppFabButton extends React.Component<IProps> {

  /**
   * React.Component
   */
  public render(): React.ReactNode {

    return (
      <React.Fragment>
        <MediaQueryLtMd>
          {this.renderStyledFabButton({
            position: 'fixed',
            right: 50,
            bottom: 50,
            zIndex: zIndex.drawer + 1
          })}
        </MediaQueryLtMd>
        <MediaQueryGtSm>
          {this.renderStyledFabButton({
            position: 'fixed',
            left: UiConstants.APP_SIDEBAR_WIDTH - UiConstants.APP_FAB_BUTTON_WIDTH / 2,
            top: UiConstants.TOOLBAR_HEIGHT + UiConstants.TOOLBAR_HEIGHT + UiConstants.MARGIN_1,
            zIndex: zIndex.drawer + 1
          })}
        </MediaQueryGtSm>
      </React.Fragment>
    );
  }

  private renderStyledFabButton(style: React.CSSProperties): React.ReactNode {
    return (
      <Button
        variant="fab"
        color="primary"
        style={style}
        component={(props: any) => <Link to={this.props.toUrl} {...props} />}
      >
        <Icon>add_icon</Icon>
      </Button>
    );
  }
}

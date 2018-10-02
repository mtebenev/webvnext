import * as React from 'react';
import {
  AppBar, Toolbar, Icon, IconButton, Typography, WithStyles, Menu, MenuItem, createStyles, withStyles, Theme
} from '@core/mui-exports';
import {IAppContextProps, withAppContext} from '../../app-context';

const styles = (theme: Theme) => createStyles({
  active: {
    background: theme.palette.action.selected
  },
  profileIcon: {
    fontSize: 60
  },
  navIcon: {
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  }
});

type TProps = WithStyles<typeof styles> & IAppContextProps;

interface IState {
  settingsMenuAnchorEl: null | HTMLElement | ((element: HTMLElement) => HTMLElement);
}

/**
 * Displays application sidebar with user info and navigation
 */
class AppHeaderImpl extends React.Component<TProps, IState> {

  constructor(props: TProps) {
    super(props);

    this.state = {settingsMenuAnchorEl: null};
  }

  public render(): React.ReactNode {

    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => {this.handleMobileDrawerToggle()}}
            className={this.props.classes.navIcon}
          >
            <Icon>menu</Icon>
          </IconButton>

          <Typography variant="title" color="inherit">
            Contact Manager
          </Typography>
          <IconButton
            color="inherit"
            aria-label="More"
            onClick={evt => {this.handleSettingsButtonClick(evt)}}
          >
            <Icon>more_vert</Icon>
          </IconButton>
          <Menu
            anchorEl={this.state.settingsMenuAnchorEl}
            open={Boolean(this.state.settingsMenuAnchorEl)}
            onClose={() => {this.handleSettingsMenuClose}}
          >
            <MenuItem onClick={() => this.handleLogOutClick()}>Log Out</MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>
    )
  }

  /**
   * Toggle mobile drawer
   */
  private handleMobileDrawerToggle(): void {
    this.props.appContext.appCommands.toggleAppMenu();
  }

  /**
   * Invoked when user toggles settings menu (right on the app header)
   */
  private handleSettingsButtonClick(event: React.MouseEvent<HTMLElement>): void {
    this.setState({...this.state, settingsMenuAnchorEl: event.currentTarget});
  }

  private handleSettingsMenuClose(): void {
    this.setState({...this.state, settingsMenuAnchorEl: null});
  }

  /**
   * LogOut menu handler
   */
  private handleLogOutClick(): void {
    this.props.appContext.appCommands.logOut();
    this.handleSettingsMenuClose();
  }
}

export const AppHeader = withStyles(styles)(withAppContext(AppHeaderImpl));

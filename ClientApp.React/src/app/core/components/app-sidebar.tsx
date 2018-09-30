import * as React from 'react';
import {
  List, ListItem, ListItemText, Icon, Divider, Typography, WithStyles, withStyles, createStyles, Theme
} from '@core/mui-exports';
import {NavLink, LinkProps} from 'react-router-dom';
import {MaterialBox} from '@layout/material-box';

const styles = (theme: Theme) => createStyles({
  active: {background: theme.palette.action.selected}
});

/**
 * Displays application sidebar with user info and navigation
 */
class AppSidebarImpl extends React.Component<WithStyles<typeof styles>> {

  public render(): React.ReactNode {

    return (
      <React.Fragment>
        <MaterialBox>
          <div>
            <Icon color="primary" style={{fontSize: 60}}>account_circle</Icon>
          </div>
          <Typography variant="title">
            Alice
        </Typography>
        </MaterialBox>
        <Divider />
        <List component="nav">
          <ListItem button={true} component={(props: LinkProps) => <NavLink to={`/companies`} activeClassName={this.props.classes.active} {...props} />} >
            <ListItemText primary="Companies" />
          </ListItem>
          <ListItem button={true} component={(props: LinkProps) => <NavLink to={`/contacts`} activeClassName={this.props.classes.active} {...props} />}>
            <ListItemText primary="Contacts" />
          </ListItem>
        </List>
      </React.Fragment>
    )
  }
}

export const AppSidebar = withStyles(styles)(AppSidebarImpl);

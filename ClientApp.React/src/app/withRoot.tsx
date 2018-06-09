import * as React from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';

// c/p from https://github.com/mui-org/material-ui/blob/master/examples/create-react-app-with-typescript/src/withRoot.tsx
const theme = createMuiTheme();

function withRoot(Component: React.ComponentType): any {

  function WithRoot(props: object): React.ReactNode {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;

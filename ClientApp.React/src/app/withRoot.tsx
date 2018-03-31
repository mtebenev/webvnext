import * as React from 'react';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

// c/p from https://github.com/mui-org/material-ui/blob/v1-beta/examples/create-react-app-with-typescript/src/withRoot.tsx
const theme = createMuiTheme();

function withRoot(Component: React.ComponentType): any {
  function WithRoot(props: object): React.ReactNode {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* Reboot kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;

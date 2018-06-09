import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as i18n from 'i18next'
import withStyles, {WithStyles, StyleRulesCallback} from '@material-ui/core/styles/withStyles';
import withRoot from './withRoot';
import {AppComponent} from './app.component';
import {I18nextProvider} from 'react-i18next';

const styles: StyleRulesCallback<'root'> = theme => ({
  root: {
  },
  '@global': {
    html: {
      width: '100%',
      height: '100%'
    },
    body: {
      width: '100%',
      height: '100%'
    },
    '#root': {
      width: '100%',
      height: '100%'
    }
  }
});

interface IIntlContext {
  i18n: i18n.i18n;
}

interface IState {
  isTranslationLoaded: boolean;
}

/**
 * Encapsulates app component initialization
 */
class RootComponent extends React.Component<WithStyles<'root'>, IState> {

  public static contextTypes: PropTypes.ValidationMap<IIntlContext> = {
    i18n: PropTypes.object
  };

  constructor(props: any, context: IIntlContext) {
    super(props);

    context.i18n.on('initialized', (options: i18n.InitOptions) => {
      this.setState({isTranslationLoaded: true});
    });

    this.state = {
      isTranslationLoaded: false
    };
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>{this.state.isTranslationLoaded &&
        <AppComponent />
      }
      </React.Fragment>
    );
  }
}

export default withRoot(withStyles(styles)<{}>(RootComponent));

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-roboto';
import {I18nextProvider} from 'react-i18next';
import {AppComponent} from './app/app.component';
import registerServiceWorker from './registerServiceWorker';
import i18n from './i18n';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <AppComponent classes={{root: 'root'}} />
  </I18nextProvider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'typeface-roboto';
import AppComponent from './app/app.component';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import './i18n';

ReactDOM.render(
  <AppComponent />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

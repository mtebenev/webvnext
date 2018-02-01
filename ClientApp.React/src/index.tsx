import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppComponent} from './app/app.component';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <AppComponent />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

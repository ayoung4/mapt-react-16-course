import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'semantic-ui-css';

import { routes } from './routes';

import { App } from './app';

ReactDOM.render(<App routes={routes} />, document.getElementById('app'), )

import * as React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router' // react-router v4
import { ConnectedRouter } from 'connected-react-router'

import { configureStore, history } from './store'
import { LandingPage } from './pages/landing';
import './index.css';

export const App = () => (
    <Provider store={configureStore()}>
        <ConnectedRouter history={history}>
            <Switch>
                <Route path='/' exact component={LandingPage} />
                <Route path='*' render={() => (<div>Miss</div>)} />
            </Switch>
        </ConnectedRouter>
    </Provider>
);

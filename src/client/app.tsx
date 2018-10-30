import * as React from 'react';
import * as R from 'ramda';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as redux from 'redux';

import { Routes } from './routes';
import { NotFoundPage } from './pages/not-found';

const reducer = (state) => state;

interface IState {
    isLoggedIn: boolean;
    user: IUser;
}

const initialState: IState = {
    isLoggedIn: false,
    user: null,
};

const store = redux.createStore<IState, any, any, any>(reducer);

export const App: React.SFC<{ routes: Routes }> =
    ({ routes }) =>
        (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        {R.map(([name, { RouteComponent = Route, ...props }]) => (
                            <RouteComponent key={name} {...props} />
                        ), R.toPairs(routes))}
                        <Route path='*'>
                            <NotFoundPage />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </Provider>
        );

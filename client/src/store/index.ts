import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history'
import { createLogger } from 'redux-logger'
import {
    createEpicMiddleware,
    createStateStreamEnhancer,
} from 'redux-most'
import { routerMiddleware } from 'connected-react-router'

import { createRootReducer } from '../reducers'
import { rootEpic } from '../epics';

export const history = createBrowserHistory()

type State = any;

export const configureStore = (preloadedState?: State) => {

    const composeEnhancers: typeof compose =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        || compose;

    const epicMiddleware = createEpicMiddleware(rootEpic);

    const logger = createLogger({
        collapsed: true,
        diff: false,
        logErrors: true,
    });

    const middleware = [
        logger,
        routerMiddleware(history),
    ];

    const storeEnhancers = composeEnhancers(
        createStateStreamEnhancer(epicMiddleware),
        applyMiddleware(...middleware)
    );

    return createStore(
        createRootReducer(history), // root reducer with router state
        preloadedState,
        storeEnhancers,
    );

};

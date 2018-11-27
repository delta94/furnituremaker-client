import * as React from 'react';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
    render,
    RootProps,
    storeValuesMiddleware,
    storeValuesRecuder
} from '@/app';
import { loginPath, mobileSize } from '@/configs';

import { DesktopRoot, MobileRoot } from './routes';

export function startup() {
    const middlewares = applyMiddleware(storeValuesMiddleware);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const configuration: RootProps = {
        store: createStore(
            combineReducers({
                form: formReducer,
                values: storeValuesRecuder
            }),
            composeEnhancers(middlewares)
        ),
        children: window.innerWidth <= mobileSize ? MobileRoot : DesktopRoot,
        loginPath: loginPath
    };
    return render(configuration);
}
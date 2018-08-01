
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
    render,
    storeValuesRecuder,
    storeValuesMiddleware,
    route
} from '@/app';

import { RouteHome } from '@/routes';

let configuration: {
    readonly store: object;
    readonly routes: React.ComponentType[]
};

export function startup() {
    if (!configuration) {
        configuration = {
            store: createStore(
                combineReducers({
                    form: formReducer,
                    values: storeValuesRecuder
                }),
                applyMiddleware(storeValuesMiddleware)
            ),
            routes: [
                RouteHome
            ]
        };
    }

    return render({
        store: configuration.store,
        children: configuration.routes.reduce(
            (currenValue, Component) => {
                return [...currenValue, route(Component)];
            },
            []
        )
    });
}
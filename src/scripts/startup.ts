
import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { render, storeValuesRecuder, route } from '@/app';

import { RouteHome } from '@/routes';

let configuration: {
    store: object;
    routes: React.ComponentType[]
};

export function startup() {
    if (!configuration) {
        configuration = {
            store: createStore(
                combineReducers({
                    form: formReducer,
                    app: storeValuesRecuder
                })
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
                currenValue.push(route(Component));
                return currenValue;
            },
            []
        )
    });
}
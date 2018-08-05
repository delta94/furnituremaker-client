
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
    render,
    storeValuesRecuder,
    storeValuesMiddleware,
    route,
    RootProps
} from '@/app';

import {
    RouteHome,
    RouteLogin
} from '@/routes';

let configuration: RootProps;

export function startup() {
    if (!configuration) {
        const appRoutes = [
            RouteHome,
            RouteLogin
        ];

        configuration = {
            store: createStore(
                combineReducers({
                    form: formReducer,
                    values: storeValuesRecuder
                }),
                applyMiddleware(storeValuesMiddleware)
            ),
            children: appRoutes.reduce(
                (currenValue, Component) => {
                    return [...currenValue, route(Component)];
                },
                []
            ),
            loginPath: RouteLogin.routeProps.path
        };
    }

    return render(configuration);
}
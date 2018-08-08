
import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux';
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

export function startup() {
    if (!window.configuration) {
        const appRoutes = [
            RouteLogin,
            RouteHome
        ];

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
            children: appRoutes.reduce(
                (currenValue, Component) => {
                    return [...currenValue, route(Component)];
                },
                []
            ),
            loginPath: RouteLogin.routeProps.path
        };
        window.configuration = configuration;
    }

    return render(window.configuration);
}
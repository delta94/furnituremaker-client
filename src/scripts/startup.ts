import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
    render,
    RootProps,
    route,
    storeValuesMiddleware,
    storeValuesRecuder
} from '@/app';
import { loginPath } from '@/configs';
import {
    RouteAddressBookLoadable,
    RouteCartLoadable,
    RouteFavoriteProductLoadable,
    RouteHomeLoadable,
    RouteLandingLoadable,
    RouteLoginLoadable,
    RouteMakerLoadable,
    RouteNotificationLoadable,
    RouteOrderDetailLoadable,
    RouteOrdersLoadable,
    RouteProductLoadable,
    RouteProfileLoadable
} from '@/routes';

export function startup() {
    const appRoutes = [
        RouteCartLoadable,
        RouteHomeLoadable,
        RouteLoginLoadable,
        RouteMakerLoadable,
        RouteOrderDetailLoadable,
        RouteOrdersLoadable,
        RouteProductLoadable,
        RouteProfileLoadable,
        RouteLandingLoadable,
        RouteAddressBookLoadable,
        RouteNotificationLoadable,
        RouteFavoriteProductLoadable
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
        loginPath: loginPath
    };
    return render(configuration);
}
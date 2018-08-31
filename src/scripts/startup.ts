import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';

import {
    render,
    RootProps,
    route,
    storeValuesMiddleware,
    storeValuesRecuder
} from '@/app';
import {
    RouteCart,
    RouteHome,
    RouteLogin,
    RouteMaker,
    RouteOrderDetail,
    RouteOrders,
    RouteTransportPolicy
} from '@/routes';

export function startup() {
    const appRoutes = [
        RouteLogin,
        RouteHome,
        RouteOrders,
        RouteOrderDetail,
        RouteMaker,
        RouteCart,
        RouteTransportPolicy
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
    return render(configuration);
}
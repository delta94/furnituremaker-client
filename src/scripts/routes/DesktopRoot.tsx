import * as React from 'react';
import { Router, Switch } from 'react-router';

import { route, withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import {
    RouteAccountVeriryLoadable,
    RouteAddressBookLoadable,
    RouteCartLoadable,
    RouteFavoriteProductLoadable,
    RouteForgotPasswordLoadable,
    RouteHomeLoadable,
    RouteLandingLoadable,
    RouteLibraryLoadable,
    RouteLoginLoadable,
    RouteMakerLoadable,
    RouteNotificationLoadable,
    RouteOrderDetailLoadable,
    RouteOrdersLoadable,
    RouteProductLoadable,
    RouteProfileLoadable,
    RouteRegisterLoadable,
    RouteRegisterSuccessLoadable,
    RouteResetPasswordLoadable
} from '@/routes/desktop';

const appRoutes = [
    RouteRegisterLoadable,
    RouteForgotPasswordLoadable,
    RouteAccountVeriryLoadable,
    RouteCartLoadable,
    RouteHomeLoadable,
    RouteMakerLoadable,
    RouteLoginLoadable,
    RouteOrderDetailLoadable,
    RouteOrdersLoadable,
    RouteProductLoadable,
    RouteProfileLoadable,
    RouteLandingLoadable,
    RouteAddressBookLoadable,
    RouteNotificationLoadable,
    RouteFavoriteProductLoadable,
    RouteRegisterSuccessLoadable,
    RouteResetPasswordLoadable,
    RouteLibraryLoadable
];

export const DesktopRoot = withStoreValues<CommonStoreProps>('appState', 'history')(({ history }) => {
    if (!history) {
        return null;
    }

    return (
        <Router history={history}>
            <Switch>
                {
                    appRoutes.reduce(
                        (currenValue, Component) => {
                            return [...currenValue, route(Component)];
                        },
                        [] as JSX.Element[]
                    )
                }
            </Switch>
        </Router>
    );
});
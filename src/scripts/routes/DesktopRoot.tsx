import * as React from 'react';
import { Router, Switch } from 'react-router';

import { route } from '@/app';
import {
    RouteAccountVeriryLoadable,
    RouteAddressBookLoadable,
    RouteCartLoadable,
    RouteContactLoadable,
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
    RoutePagesLoadable,
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
    RouteLibraryLoadable,
    RouteContactLoadable,
    RoutePagesLoadable
];

export const DesktopRoot = ({ history }) => {
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
};
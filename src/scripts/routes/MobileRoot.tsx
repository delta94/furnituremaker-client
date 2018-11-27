import * as React from 'react';
import { Route, Switch } from 'react-router';

import { route, withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';
import { DefaultLayoutMobile } from '@/layout/DefaultLayoutMobile';
import { RouteLoginLoadable } from '@/routes/desktop';
import {
    RouteCartLoadable,
    RouteCheckoutLoadable,
    RouteHomeLoadable,
    RouteLandingLoadable,
    RouteMakerLoadable
} from '@/routes/mobile';

const appRoutes = [
    RouteMakerLoadable,
    RouteHomeLoadable,
    RouteLandingLoadable,
    RouteCartLoadable,
    RouteCheckoutLoadable
].reduce(
    (currenValue, Component) => {
        return [...currenValue, route(Component)];
    },
    [] as JSX.Element[]
);

const authRoutes = [
    route(RouteLoginLoadable)
];

export const MobileRoot = withStoreValues<CommonStoreProps>('appState')(({ appState }) => {
    return (
        <Switch>
            {authRoutes}
            {
                appState === 'READY' && (
                    <Route>
                        <DefaultLayoutMobile>
                        {
                            appRoutes
                        }
                        </DefaultLayoutMobile>
                    </Route>
                )
            }
        </Switch>
    );
});
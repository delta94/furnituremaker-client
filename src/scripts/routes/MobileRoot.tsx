import * as React from 'react';
import { Route, Router, Switch } from 'react-router';

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

export const MobileRoot = withStoreValues<CommonStoreProps>('appState', 'history')(({ history }) => {
    if(!history) {
        return null;
    }
    
    return (
        <Router history={history}>
            <Switch>
                {authRoutes}
                <Route>
                    <DefaultLayoutMobile>
                        {
                            appRoutes
                        }
                    </DefaultLayoutMobile>
                </Route>
            </Switch>
        </Router>
    );
});
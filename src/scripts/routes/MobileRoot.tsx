import * as React from 'react';
import { Switch } from 'react-router';

import { route } from '@/app';
import { RouteMakerLoadable } from '@/routes/desktop';

const appRoutes = [
    RouteMakerLoadable,
];

export const MobileRoot = () => {
    return (
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
    );
};
import * as React from 'react';
import * as Loadable from 'react-loadable';

import { RouteMakerRouterProps } from './Types';

export const RouteMakerLoadable = Loadable({
    loader: () => import('./RouteMaker').then(o => o.RouteMaker),
    loading: () => <div>Loading...</div>
});

RouteMakerLoadable.defaultProps = {
    routeProps: {
        path: `/maker/:${nameof<RouteMakerRouterProps>(o => o.modulesCode)}?`,
        exact: true
    }
};
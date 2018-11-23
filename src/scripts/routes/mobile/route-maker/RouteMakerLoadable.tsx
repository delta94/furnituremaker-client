import * as React from 'react';
import * as Loadable from 'react-loadable';

import { RouteMakerBaseRouterProps } from '@/routes/shared';

export const RouteMakerLoadable = Loadable({
    loader: () => import(/* webpackPrefetch: true */ './RouteMaker').then(o => o.RouteMaker),
    loading: () => <div>Loading...</div>
});

RouteMakerLoadable.defaultProps = {
    routeProps: {
        path: `/maker/:${nameof<RouteMakerBaseRouterProps>(o => o.modulesCode)}?`,
        exact: true
    }
};
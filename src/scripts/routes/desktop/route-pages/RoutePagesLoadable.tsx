import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RoutePagesLoadable = Loadable({
    loader: () => import(/* webpackPreload: true */ './RoutePages').then(o => o.RoutePages),
    loading: () => <div>Loading...</div>
});

RoutePagesLoadable.defaultProps = {
    routeProps: {
        path: '/pages/:slug',
        exact: true
     }
};
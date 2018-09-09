import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteCartLoadable = Loadable({
    loader: () => import('./RouteCart').then(o => o.RouteCart),
    loading: () => <div>Loading...</div>
});

RouteCartLoadable.defaultProps = {
    routeProps: {
        path: '/send-order',
        exact: true
    }
};
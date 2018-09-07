import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteOrderDetailLoadable = Loadable({
    loader: () => import('./RouteOrderDetail').then(o => o.RouteOrderDetail),
    loading: () => <div>Loading...</div>
});

RouteOrderDetailLoadable.defaultProps = {
    routeProps: {
        path: '/orders/:id'
    }
};
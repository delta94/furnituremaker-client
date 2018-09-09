import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteOrdersLoadable = Loadable({
    loader: () => import('./RouteOrders').then(o => o.RouteOrders),
    loading: () => <div>Loading...</div>
});

RouteOrdersLoadable.defaultProps = {
    routeProps: {
        path: '/orders',
        exact: true
    }
};
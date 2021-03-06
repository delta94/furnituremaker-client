import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteHomeLoadable = Loadable({
    loader: () => import(/* webpackPreload: true */ './RouteHome').then(o => o.RouteHome),
    loading: () => <div>Loading...</div>
});

RouteHomeLoadable.defaultProps = {
    routeProps: {
        path: '/product',
        exact: true
     }
};
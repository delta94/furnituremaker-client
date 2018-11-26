import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteCartLoadable = Loadable({
    loader: () => import(/* webpackPrefetch: true */ './RouteCart').then(o => o.RouteCart),
    loading: () => <div>Loading...</div>
});

RouteCartLoadable.defaultProps = {
    routeProps: {
        path: '/cart',
        exact: true
     }
};
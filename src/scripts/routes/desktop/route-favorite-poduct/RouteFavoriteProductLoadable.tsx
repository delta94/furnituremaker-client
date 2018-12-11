import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteFavoriteProductLoadable = Loadable({
    loader: () => import(/* webpackPreload: true */ './RouteFavoriteProduct').then(o => o.RouteFavoriteProduct),
    loading: () => <div>Loading...</div>
});

RouteFavoriteProductLoadable.defaultProps = {
    routeProps: {
        path: '/favorite-product',
        exact: true
     }
};
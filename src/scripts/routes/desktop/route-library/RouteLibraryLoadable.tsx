import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteLibraryLoadable = Loadable({
    loader: () => import(/* webpackPrefetch: true */ './RouteLibrary').then(o => o.RouteLibrary),
    loading: () => <div>Loading...</div>
});

RouteLibraryLoadable.defaultProps = {
    routeProps: {
        path: '/library',
        exact: true
     }
};
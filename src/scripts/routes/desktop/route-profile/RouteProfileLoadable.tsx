import * as React from 'react';
import * as Loadable from 'react-loadable';

export const getProfileRoutePath = () => '/profile';

export const RouteProfileLoadable = Loadable({
    loader: () => import(/* webpackPreload: true */ './RouteProfile').then(o => o.RouteProfile),
    loading: () => <div>Loading...</div>
});

RouteProfileLoadable.defaultProps = {
    routeProps: {
        path: getProfileRoutePath(),
        exact: true
    }
};
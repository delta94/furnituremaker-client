import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteContactLoadable = Loadable({
    loader: () => import(/* webpackPreload: true */ './RouteContact').then(o => o.RouteContact),
    loading: () => <div>Loading...</div>
});

RouteContactLoadable.defaultProps = {
    routeProps: {
        path: '/contact',
        exact: true
    }
};
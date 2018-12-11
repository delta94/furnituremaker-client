import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteLandingLoadable = Loadable({
    loader: () => import(/* webpackPreload: true */ './RouteLanding').then(o => o.RouteLanding),
    loading: () => <div>Loading...</div>
});

RouteLandingLoadable.defaultProps = {
    routeProps: {
        path: '/',
        exact: true
     }
};
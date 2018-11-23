import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteForgotPasswordLoadable = Loadable({
    loader: () => import(/* webpackPrefetch: true */ './RouteForgotPassword').then(o => o.RouteForgotPassword),
    loading: () => <div>Loading...</div>
});

RouteForgotPasswordLoadable.defaultProps = {
    routeProps: {
        path: '/forgot-password'
    }
};
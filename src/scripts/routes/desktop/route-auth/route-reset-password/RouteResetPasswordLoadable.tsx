import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteResetPasswordLoadable = Loadable({
    loader: () => import(/* webpackPreload: true */ './RouteResetPassword').then(o => o.RouteResetPassword),
    loading: () => <div>Loading...</div>
});

RouteResetPasswordLoadable.defaultProps = {
    routeProps: {
        path: '/reset-password'
    }
};
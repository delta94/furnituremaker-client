import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteRegisterSuccessLoadable = Loadable({
    loader: () => import(/* webpackPrefetch: true */ './RouteRegisterSuccess').then(o => o.RouteRegisterSuccess),
    loading: () => <div>Loading...</div>
});

RouteRegisterSuccessLoadable.defaultProps = {
    routeProps: {
        path: '/register-success'
    }
};
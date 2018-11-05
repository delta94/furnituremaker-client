import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteRegisterLoadable = Loadable({
    loader: () => import('./RouteRegister').then(o => o.RouteRegister),
    loading: () => <div>Loading...</div>
});

RouteRegisterLoadable.defaultProps = {
    routeProps: {
        path: '/register'
    }
};
import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteAccountVeriryLoadable = Loadable({
    loader: () => import(/* webpackPrefetch: true */ './RouteAccountVerity').then(o => o.RouteAccountVerity),
    loading: () => <div>Loading...</div>
});

RouteAccountVeriryLoadable.defaultProps = {
    routeProps: {
        path: '/account-verify'
    }
};
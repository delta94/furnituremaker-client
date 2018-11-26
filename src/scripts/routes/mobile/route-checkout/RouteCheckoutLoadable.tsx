import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteCheckoutLoadable = Loadable({
    loader: () => import(/* webpackPrefetch: true */ './RouteCheckout').then(o => o.RouteCheckout),
    loading: () => <div>Loading...</div>
});

RouteCheckoutLoadable.defaultProps = {
    routeProps: {
        path: '/send-order',
        exact: true
    }
};
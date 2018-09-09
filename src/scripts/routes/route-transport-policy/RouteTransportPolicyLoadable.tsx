import * as React from 'react';
import * as Loadable from 'react-loadable';

export const transportPolicyRoutePath = '/transport-policy';

export const RouteTransportPolicyLoadable = Loadable({
    loader: () => import('./RouteTransportPolicy').then(o => o.RouteTransportPolicy),
    loading: () => <div>Loading...</div>
});

RouteTransportPolicyLoadable.defaultProps = {
    routeProps: {
        path: transportPolicyRoutePath,
        exact: true
    }
};
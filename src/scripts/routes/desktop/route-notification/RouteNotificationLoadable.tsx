import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteNotificationLoadable = Loadable({
    loader: () => import(/* webpackPrefetch: true */ './RouteNotification').then(o => o.RouteNotification),
    loading: () => <div>Loading...</div>
});

RouteNotificationLoadable.defaultProps = {
    routeProps: {
        path: '/notifications',
        exact: true
     }
};
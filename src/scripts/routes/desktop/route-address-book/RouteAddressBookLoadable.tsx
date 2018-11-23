import * as React from 'react';
import * as Loadable from 'react-loadable';

export const RouteAddressBookLoadable = Loadable({
    loader: () => import(/* webpackPrefetch: true */ './RouteAddressBook').then(o => o.RouteAddressBook),
    loading: () => <div>Loading...</div>
});

RouteAddressBookLoadable.defaultProps = {
    routeProps: {
        path: '/addresses',
        exact: true
     }
};
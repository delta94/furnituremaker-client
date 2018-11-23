import * as React from 'react';
import * as Loadable from 'react-loadable';

import { loginPath } from '@/configs';

export const RouteLoginLoadable = Loadable({
    loader: () => import(/* webpackPrefetch: true */ './RouteLogin').then(o => o.RouteLogin),
    loading: () => <div>Loading...</div>
});

RouteLoginLoadable.defaultProps = {
    routeProps: {
        path: loginPath
    }
};
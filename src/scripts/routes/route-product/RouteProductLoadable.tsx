import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Product } from '@/restful';

export const productRoutePath = '/product/:id';

export const getProductLink = (product: Product) => {
    return productRoutePath.replace(':id', product.id);
};

export const RouteProductLoadable = Loadable({
    loader: () => import('./RouteProduct').then(o => o.RouteProduct),
    loading: () => <div>Loading...</div>
});

RouteProductLoadable.defaultProps = {
    routeProps: {
        path: productRoutePath,
        exact: true
    }
};
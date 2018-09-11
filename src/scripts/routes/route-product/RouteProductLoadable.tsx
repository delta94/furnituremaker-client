import * as React from 'react';
import * as Loadable from 'react-loadable';

import { Product } from '@/restful';

import { RouteParams } from './RouteProduct';

export const productRoutePath = `/product/:${nameof<RouteParams>(o => o.productCode)}`;

export const getProductLink = (product: Partial<Product>) => {
    return productRoutePath.replace(`:${nameof<RouteParams>(o => o.productCode)}`, product.produceCode);
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
import * as React from 'react';

import { Img } from '@/components';
import { Product } from '@/restful';

export interface HomeProductPreviewProps {
    readonly product: Product;
}

export class HomeProductPreview extends React.PureComponent<HomeProductPreviewProps> {
    public render() {
        const { product } = this.props;
        return (
            <div>
                <Img file={product.thumbnail} />
            </div>
        );
    }
}

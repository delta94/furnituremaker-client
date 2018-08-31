import * as React from 'react';

import { AntdCard } from '@/components';
import { CartDrawerContent } from '@/layout/default-layout';

interface CartProductsProps {
}

export class CartProducts extends React.Component<CartProductsProps> {
    render() {

        return (
            <AntdCard title="Danh sách sản phẩm">
                <CartDrawerContent />
            </AntdCard>
        );
    }
}
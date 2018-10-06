import * as React from 'react';
import styled from 'styled-components';

import { AntdCard } from '@/components';
import { CartDrawerContent } from '@/layout/default-layout';

const CartProductsWrapper = styled.div`
    .ant-card-head {
        background: #EFB416;
        text-align: center;
    }
`;

interface CartProductsProps {
}

export class CartProducts extends React.Component<CartProductsProps> {
    render() {
        return (
            <CartProductsWrapper>
                <AntdCard bordered={false} title="GIỎ HÀNG CỦA BẠN">
                    <CartDrawerContent mode="default" />
                </AntdCard>
            </CartProductsWrapper>
        );
    }
}
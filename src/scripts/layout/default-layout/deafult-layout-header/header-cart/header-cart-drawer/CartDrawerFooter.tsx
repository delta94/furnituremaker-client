import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { mobileSize } from '@/configs';

const CartDrawerFooterWrapper = styled.div`
    width: 244px;
    margin: 0 auto;
    @media screen and (max-width: ${mobileSize}px) {
        width: auto;
        padding: 0 10px;
    }
`;

const LinkContent = styled.div`
    height: 60px;
    line-height: 60px;
    background: #FFFFFF;
    border: 1px solid #D09D15;
    box-sizing: border-box;
    border-radius: 3px;
    font-size: 14px;
    text-align: center;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #000000;
`;

interface CartDrawerFooterProps {
}

export class CartDrawerFooter extends React.Component<CartDrawerFooterProps> {
    render() {
        return (
            <CartDrawerFooterWrapper>
                <Link to="/send-order" style={{ display: 'block' }}>
                    <LinkContent>Tiến hành đặt hàng</LinkContent>
                </Link>
            </CartDrawerFooterWrapper>
        );
    }
}
import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
            <Link to="/send-order" style={{ width: 244, display: 'block', margin: '0 auto' }}>
                <LinkContent>Tiến hành đặt hàng</LinkContent>
            </Link>
        );
    }
}
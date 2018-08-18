import * as React from 'react';
import { Link } from 'react-router-dom';

interface CartDrawerFooterProps {
}

export class CartDrawerFooter extends React.Component<CartDrawerFooterProps> {
    render() {
        return <Link to="/send-order">Tiến hành đặt hàng</Link>;
    }
}
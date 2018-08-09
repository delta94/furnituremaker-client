import * as React from 'react';
import { withTempOrderDetails, WithTempOrderDetails, restfulStore, OrderDetail } from '@/restful';
import { CreateOrderControl } from '@/forms/create-order';

interface CartDrawerFooterProps extends WithTempOrderDetails {
}

@withTempOrderDetails(restfulStore)
export class CartDrawerFooter extends React.Component<CartDrawerFooterProps> {
    render() {
        const { orderDetails } = this.props;
        return (
            <div>
                Đặt Hàng
                <CreateOrderControl orderDetails={orderDetails} />
            </div>
        );
    }
}
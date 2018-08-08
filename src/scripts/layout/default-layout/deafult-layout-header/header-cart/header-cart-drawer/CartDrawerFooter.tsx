import * as React from 'react';
import { withTempOrderDetails, WithTempOrderDetails, restfulStore, OrderDetail } from '@/restful';
import { AntdList, AntdButton } from '@/components';

interface CartDrawerFooterProps {
}

@withTempOrderDetails(restfulStore)
export class CartDrawerFooter extends React.Component<CartDrawerFooterProps> {
    render() {
        return (
            <div>
                <AntdButton
                    type="primary"
                >
                    Đặt hàng
                </AntdButton>
            </div>
        );
    }
}
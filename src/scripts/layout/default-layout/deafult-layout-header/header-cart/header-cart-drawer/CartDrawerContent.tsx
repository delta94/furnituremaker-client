import * as React from 'react';
import { withTempOrderDetails, WithTempOrderDetails, restfulStore, OrderDetail } from '@/restful';
import { AntdList, AntdButton, AntdInputNumber } from '@/components';
import { formatCurrency } from '@/utilities';

interface CartDrawerContentProps extends WithTempOrderDetails {
}

@withTempOrderDetails(restfulStore)
export class CartDrawerContent extends React.Component<CartDrawerContentProps> {
    render() {
        const { orderDetails } = this.props;
        return (
            <AntdList
                itemLayout="vertical"
                dataSource={orderDetails}
                renderItem={(item: OrderDetail) => {
                    return (
                        <AntdList.Item
                            key={item.id}
                            actions={[
                                <AntdInputNumber
                                    placeholder="Số lượng"
                                    value={item.quantity}
                                    key="quantity"
                                    min={0}
                                />,
                                <AntdButton
                                    key="remove"
                                    icon="delete"
                                    type="danger"
                                    ghost={true}
                                >
                                    xóa
                                </AntdButton>
                            ]}
                        >
                            <AntdList.Item.Meta
                                title={<a href="https://ant.design">{item.productType.name}</a>}
                                description={(
                                    <div>
                                        <span>Giá: {formatCurrency(item.totalPrice)}</span>
                                    </div>
                                )}
                            />
                        </AntdList.Item>
                    );
                }}
            />
        );
    }
}
import * as React from 'react';
import { Field, Form } from 'redux-form';
import styled from 'styled-components';

import {
    AntdCheckbox,
    AntdCol,
    AntdRow,
    renderInput,
    renderTextArea
} from '@/components';

import { CreateOrderFormValues } from '../CreateOrderForm';

const OrderContactInfoWrapper = styled.div`
    display: block;
`;

const OrderContactInfoContent = styled.div`
    background: #F7F7F7;
    padding: 15px 15px 0 15px;
    margin-bottom: 15px;
`;

export interface OrderContactInfoProps {
}

export class OrderContactInfo extends React.PureComponent<OrderContactInfoProps> {
    readonly state = {
        showInput: false
    };

    public render() {
        const { showInput } = this.state;
        return (
            <OrderContactInfoWrapper>
                <p>
                    <AntdCheckbox
                        value={showInput}
                        onChange={e => this.setState({
                            showInput: !showInput
                        })}
                    >
                        Sử dụng Họ tên và số điện thoại của địa chỉ giao hàng
                    </AntdCheckbox>
                </p>
                {
                    showInput &&
                    (
                        <OrderContactInfoContent>
                            <p>Nếu bạn gởi hàng cho người khác, vui lòng nhập{' '}
                                vào Họ tên và số điện thoại của chính bạn để tiện liên lạc
                            </p>
                            <AntdRow gutter={10}>
                                <AntdCol span={12}>
                                    <Field
                                        name={nameof.full<CreateOrderFormValues>(o => o.order.contactToPhone)}
                                        component={renderInput}
                                        required={true}
                                        label="Họ tên"
                                        inputProps={{
                                            placeholder: 'Nhập tên của bạn'
                                        }}
                                    />
                                </AntdCol>
                                <AntdCol span={12}>
                                    <Field
                                        name={nameof.full<CreateOrderFormValues>(o => o.order.contactTo)}
                                        component={renderInput}
                                        required={true}
                                        label="Điện thoại"
                                        inputProps={{
                                            placeholder: 'Nhập số điện thoại'
                                        }}
                                    />
                                </AntdCol>
                            </AntdRow>
                        </OrderContactInfoContent>
                    )
                }
            </OrderContactInfoWrapper>
        );
    }
}

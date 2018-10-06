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

const OrderBillingInfomationWrapper = styled.div`
    display: block;
`;

const OrderBillingInfomationContent = styled.div`
    background: #F7F7F7;
    padding: 0 15px;
    margin-bottom: 15px;
`;

export interface OrderBillingInfomationProps {
}

export class OrderBillingInfomation extends React.PureComponent<OrderBillingInfomationProps> {
    readonly state = {
        showInput: false
    };

    public render() {
        const { showInput } = this.state;

        return (
            <OrderBillingInfomationWrapper>
                <p>
                    <AntdCheckbox
                        value={showInput}
                        onChange={e => this.setState({
                            showInput: !showInput
                        })}
                    >
                        Thông tin xuất hóa đơn
                    </AntdCheckbox>
                </p>
                {
                    showInput && (
                        <React.Fragment>
                            <OrderBillingInfomationContent>
                                <AntdRow>
                                    <AntdCol span={12}>
                                        <Field
                                            name={nameof.full<CreateOrderFormValues>(o => o.order.billingOrganization)}
                                            component={renderInput}
                                            label="Tên công ty"
                                            inputProps={{
                                                placeholder: 'Nhập tên công ty'
                                            }}
                                        />
                                        <Field
                                            name={nameof.full<CreateOrderFormValues>(o => o.order.billingTaxcode)}
                                            component={renderInput}
                                            label="Mã số thuế"
                                            inputProps={{
                                                placeholder: 'Nhập mã số thuế'
                                            }}
                                        />
                                        <Field
                                            name={nameof.full<CreateOrderFormValues>(o => o.order.billingAddresss)}
                                            component={renderTextArea}
                                            label="Địa chỉ"
                                            inputProps={{
                                                placeholder: 'nhập địa chỉ'
                                            }}
                                        />
                                    </AntdCol>
                                    <AntdCol span={12} />
                                </AntdRow>
                            </OrderBillingInfomationContent>
                            <ul style={{ textAlign: 'justify' }}>
                                <p>Lưu ý:</p>
                                <li>
                                    Hóa đơn đỏ cho các sản phẩm của Furnituremaker
                                    sẽ được xuất sau 14 ngày kể từ thời điểm khách hàng nhận hàng
                                </li>
                                <li>
                                    Furnituremaker từ chối xử lý các yêu cầu phát {' '}
                                    sinh trong việc kê khai thuế đối với những hóa {' '}
                                    đơn từ 20 triệu đồng trở lên thanh toán bằng tiền mặt
                                </li>
                                <li>
                                    Furnituremaker từ chối xử lý các yêu cầu phát sinh {' '}
                                    trong việc kê khai thuế đối với những hóa đơn từ 20 triệu {' '}
                                    đồng trở lên thanh toán bằng tiền mặt
                                </li>
                            </ul>
                        </React.Fragment>
                    )
                }

            </OrderBillingInfomationWrapper>
        );
    }
}

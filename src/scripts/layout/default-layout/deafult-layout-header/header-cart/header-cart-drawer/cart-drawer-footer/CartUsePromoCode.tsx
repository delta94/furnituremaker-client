import './CartUserPromoCode.scss';

import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import {
    AntdCol,
    AntdIcon,
    AntdInput,
    AntdRow,
    AntdTooltip
} from '@/components';
import { Promotion, promotionResources, restfulFetcher } from '@/restful';
import { formatCurrency } from '@/utilities';

const InputLabel = styled.div`
    font-size: 14px;
    margin-bottom: 6px;
`;

const PromotionValue = styled.div`
    text-align: right;
    font-size: 18px;
    color: #000000;
`;

interface CartUsePromoCodeState {
    readonly promotion: Promotion;
    readonly status?: 'success' | 'error';
    readonly message?: string;
    readonly inputValue?: string;
}

@withStoreValues()
export class CartUsePromoCode extends React.Component<{}, CartUsePromoCodeState> {
    readonly state: CartUsePromoCodeState = {
        promotion: null,
    };

    readonly findPromotion = async (promotionCode: string): Promise<Promotion> => {
        const promotions = await restfulFetcher.fetchResource<Promotion[]>(
            promotionResources.find,
            [{
                type: 'query',
                parameter: nameof<Promotion>(o => o.code),
                value: promotionCode
            }, {
                type: 'query',
                parameter: nameof<Promotion>(o => o.enabled),
                value: true
            }]
        );

        return promotions.find(o => o.code === promotionCode);
    }

    readonly clearPromotion = () => {
        this.setState({
            promotion: null,
            status: null,
            message: null,
            inputValue: ''
        });
    }

    async componentDidUpdate() {
        const { inputValue, status } = this.state;

        if (inputValue && inputValue.length === 5 && !status) {
            const promotion = await this.findPromotion(inputValue);
            if (promotion) {
                this.setState({
                    promotion: promotion,
                    status: 'success',
                    message: 'Mã hợp lệ'
                });
            } else {
                this.setState({
                    promotion: null,
                    status: 'error',
                    message: 'Mã không khả dụng'
                });
            }
        }
    }

    render() {
        const { promotion, message, status, inputValue } = this.state;
        return (
            <AntdRow className="cart-use-promo-code">
                <AntdCol span={24}>
                    <InputLabel>Sử dụng mã giảm giá</InputLabel>
                </AntdCol>
                <AntdCol span={12}>
                    <AntdInput
                        value={inputValue}
                        className="w-100"
                        placeholder="Promo Code"
                        onChange={(e) => {
                            this.setState({
                                inputValue: e.currentTarget.value
                            });
                        }}
                        prefix={
                            <AntdTooltip
                                trigger={'hover'}
                                title={message}
                                placement="topLeft"
                                overlayClassName="numeric-input"
                            >
                                {this.getInputIcon(status, message)}
                            </AntdTooltip>
                        }
                        suffix={message ? <AntdIcon type="close-circle" onClick={this.clearPromotion} /> : null}
                    />
                </AntdCol>
                <AntdCol span={12}>
                    {
                        promotion && (
                            <PromotionValue>
                                -{formatCurrency(promotion.discountPrice)}
                            </PromotionValue>
                        )
                    }
                </AntdCol>
            </AntdRow>
        );
    }

    getInputIcon(status: CartUsePromoCodeState['status'], message: string) {
        switch (status) {
            case 'success':
                return <AntdIcon style={{ color: 'green' }} type="gift" />;
            case 'error':
                return <AntdIcon style={{ color: 'darksalmon' }} type="warning" />;
            default:
                return <AntdIcon style={{ color: '#d9d9d9' }} type="gift" />;
        }
    }
}
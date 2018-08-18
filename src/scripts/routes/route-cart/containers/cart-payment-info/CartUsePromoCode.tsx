import './CartUserPromoCode.scss';

import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import {
    AntdCol,
    AntdIcon,
    AntdInput,
    AntdRow,
    AntdSpin,
    AntdTooltip
} from '@/components';
import { CommonStoreProps } from '@/configs';
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
    readonly status?: 'fetching' | 'success' | 'error';
    readonly message?: string;
    readonly inputValue?: string;
    readonly inputDisabled?: boolean;
}

@withStoreValues()
export class CartUsePromoCode extends React.Component<CommonStoreProps, CartUsePromoCodeState> {
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
        this.resetState();
        this.usePromotion(null);
    }

    readonly resetState = () => {
        this.setState({
            promotion: null,
            status: null,
            message: null,
            inputValue: '',
            inputDisabled: false
        });
    }
    readonly usePromotion = (promotion: Promotion) => {
        const { setStore } = this.props;
        setStore({
            [nameof<CommonStoreProps>(o => o.selectedPromotion)]: promotion
        });
    }

    async componentDidUpdate(
        prevProps: CommonStoreProps,
        prevState: CartUsePromoCodeState,
    ) {
        const { inputValue, status } = this.state;

        if (status === 'error' && inputValue !== prevState.inputValue) {
            this.resetState();
        }

        if (inputValue && inputValue.length === 5 && !status) {
            this.setState({
                status: 'fetching',
                inputDisabled: true
            });

            const promotion = await this.findPromotion(inputValue);
            if (promotion) {
                this.setState({
                    promotion: promotion,
                    status: 'success',
                    message: 'Mã hợp lệ',
                    inputDisabled: true
                });
            } else {
                this.setState({
                    promotion: null,
                    status: 'error',
                    message: 'Mã không khả dụng'
                });
            }
            this.usePromotion(promotion);
        }
    }

    render() {
        const { promotion, message, status, inputValue, inputDisabled } = this.state;
        return (
            <AntdRow className="cart-use-promo-code">
                <AntdCol span={24}>
                    <InputLabel>Sử dụng mã giảm giá</InputLabel>
                </AntdCol>
                <AntdCol span={12}>
                    <AntdInput
                        value={inputValue}
                        readOnly={inputDisabled}
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
            case 'fetching':
                return <AntdSpin indicator={<AntdIcon type="loading" spin={true} />} />;
            case 'success':
                return <AntdIcon style={{ color: 'green' }} type="gift" />;
            case 'error':
                return <AntdIcon style={{ color: 'darksalmon' }} type="warning" />;
            default:
                return <AntdIcon style={{ color: '#d9d9d9' }} type="gift" />;
        }
    }
}
import * as React from 'react';
import {
    AntdRow,
    AntdCol,
    Container,
} from '@/components';

import { ProductSence } from './ProductSence';
import { ProductInfo } from './ProductInfo';

export class ProductLayout extends React.Component {
    render() {
        return (
            <Container>
                <AntdRow type="flex">
                    <AntdCol span={16}>
                        <ProductSence />
                    </AntdCol>
                    <AntdCol span={8}>
                        <ProductInfo />
                    </AntdCol>
                </AntdRow>
            </Container>
        );
    }
}
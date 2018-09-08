import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues } from '@/app';
import { AntdSelect, Container } from '@/components';
import { CommonStoreProps } from '@/configs';

const HomeProductFilterWrapper = styled.div`
    margin: 0 0 20px 0;
`;

interface HomeProductFilterProps extends Pick<CommonStoreProps, 'history'> {

}

@withStoreValues<HomeProductFilterProps>('history')
export class HomeProductFilter extends React.PureComponent<HomeProductFilterProps> {
    render() {
        return (
            <HomeProductFilterWrapper>
                <Container>
                    <AntdSelect
                        placeholder="Sắp xếp sản phẩm"
                        style={{ minWidth: 160 }}
                        onChange={(value: string) => {
                            // ...
                        }}
                    >
                        <AntdSelect.Option value="totalPrice:asc">Giá cao đến thấp</AntdSelect.Option>
                        <AntdSelect.Option value="totalPrice:desc">Giá thấp đến cao</AntdSelect.Option>
                    </AntdSelect>
                </Container>
            </HomeProductFilterWrapper>
        );
    }
}
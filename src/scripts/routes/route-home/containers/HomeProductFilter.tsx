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
        const { history } = this.props;

        return (
            <HomeProductFilterWrapper>
                <Container>
                    <AntdSelect
                        placeholder="Sắp xếp sản phẩm"
                        style={{ minWidth: 160 }}
                        onChange={(value: string) => {
                            const currentSearchParams = new URLSearchParams(location.search);
                            currentSearchParams.set('_sort', value);
                            history.push(`?${currentSearchParams.toString()}`);
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
import groupBy from 'lodash/groupBy';
import * as React from 'react';
import styled from 'styled-components';

import { withStoreValues, WithStoreValuesDispatchs } from '@/app';
import { AntdCheckbox } from '@/components/antd-component';
import { CommonStoreProps } from '@/configs';

import { ThreeComponentListProps } from '../ThreeComponentListBase';

const SenceComponentVariantFilterWrapper = styled.div`
    position: absolute;
    top: 0;
    .checkbox-wrapper {
        margin-bottom: 5px;
    }
`;

const SenceComponentVariantFilterContent = styled.div`
    display: flex;
`;

interface SenceComponentVariantFilterProps extends
    Pick<WithStoreValuesDispatchs, 'setStore'>,
    Pick<CommonStoreProps, 'selectedComponent'>,
    Pick<CommonStoreProps, 'selectedComponentHeight'>,
    Pick<ThreeComponentListProps, 'components'> {
}

@withStoreValues<SenceComponentVariantFilterProps>(
    'components',
    'selectedComponent',
    'selectedComponentHeight'
)
export class SenceComponentVariantFilter extends React.PureComponent<SenceComponentVariantFilterProps> {
    render() {
        const {
            components,
            selectedComponent,
            selectedComponentHeight,
            setStore
        } = this.props;

        if (!selectedComponent) {
            return null;
        }

        const heightVariantComponents = components.filter(o => !!o.height);
        const heightGroups = groupBy(heightVariantComponents, 'height');
        const avaliableHeights = Object.keys(heightGroups);

        return (
            <SenceComponentVariantFilterWrapper>
                <SenceComponentVariantFilterContent>
                    <div>
                        {
                            avaliableHeights.map(height => {
                                return (
                                    <div className="checkbox-wrapper" key={height}>
                                        <AntdCheckbox
                                            checked={selectedComponentHeight === height}
                                            value={height}
                                            onChange={() => {
                                                setStore({
                                                    selectedComponentHeight: height
                                                });
                                            }}
                                        >
                                            H: {height} mm
                                        </AntdCheckbox>
                                    </div>
                                );
                            })
                        }
                    </div>
                </SenceComponentVariantFilterContent>
            </SenceComponentVariantFilterWrapper>
        );
    }
}
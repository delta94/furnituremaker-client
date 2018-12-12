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
    Pick<CommonStoreProps, 'selectedComponentDiameter'>,
    Pick<ThreeComponentListProps, 'components'> {
}

@withStoreValues<SenceComponentVariantFilterProps>(
    'components',
    'selectedComponent',
    'selectedComponentHeight',
    'selectedComponentDiameter'
)
export class SenceComponentVariantFilter extends React.PureComponent<SenceComponentVariantFilterProps> {
    render() {
        const {
            components,
            selectedComponent,
            selectedComponentHeight,
            selectedComponentDiameter,
            setStore
        } = this.props;

        if (!selectedComponent) {
            return null;
        }

        const heightVariantComponents = components.filter(o => !!o.height);
        const heightGroups = groupBy(heightVariantComponents, 'height');
        const avaliableHeights = Object.keys(heightGroups);

        const diameterVariantComponents = components.filter(o => !!o.diameter);
        const diameterGroups = groupBy(diameterVariantComponents, 'diameter');
        const avaliableDiameters = Object.keys(diameterGroups);

        const lengthinessVariantComponents = components.filter(o => !!o.lengthiness);
        const lengthinessGroups = groupBy(lengthinessVariantComponents, 'lengthiness');
        const avaliableLengthinesss = Object.keys(lengthinessGroups);

        return (
            <SenceComponentVariantFilterWrapper>
                <SenceComponentVariantFilterContent>
                    <div style={{ marginRight: 15 }}>
                        {
                            avaliableHeights.map(height => {
                                return (
                                    <div className="checkbox-wrapper" key={height}>
                                        <AntdCheckbox
                                            checked={selectedComponentHeight === height}
                                            value={height}
                                            onChange={() => {
                                                setStore({
                                                    selectedComponentHeight: height || null
                                                });
                                            }}
                                        >
                                            H={height}mm
                                        </AntdCheckbox>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div>
                        {
                            avaliableDiameters.map(diameter => {
                                return (
                                    <div className="checkbox-wrapper" key={diameter}>
                                        <AntdCheckbox
                                            checked={selectedComponentDiameter === diameter}
                                            value={diameter}
                                            onChange={() => {
                                                setStore({
                                                    selectedComponentDiameter: diameter || null
                                                });
                                            }}
                                        >
                                            Ø={diameter}mm
                                        </AntdCheckbox>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div>
                        {
                            avaliableLengthinesss.map(lengthinesss => {
                                return (
                                    <div className="checkbox-wrapper" key={lengthinesss}>
                                        <AntdCheckbox
                                            checked={selectedComponentDiameter === lengthinesss}
                                            value={lengthinesss}
                                            onChange={() => {
                                                setStore({
                                                    selectedComponentDiameter: lengthinesss || null
                                                });
                                            }}
                                        >
                                            L={lengthinesss}mm
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
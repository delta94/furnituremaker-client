import * as React from 'react';
import autobind from 'autobind-decorator';
import styled from 'styled-components';

import {
    ThreeSence,
    AntdRow,
    AntdCol,
    ThreeMaterialList,
    ThreeComponentList,
    Container,
    Condition
} from '@/components';
import { FurnutureMaterial } from '@/restful';
import { withStoreValues, WithStoreValuesProps } from '@/app';

interface RouteHomeProps extends WithStoreValuesProps {
    selectedObject?: THREE.Mesh | null;
}

@withStoreValues('selectedObject')
export class ProductInfo extends React.Component<RouteHomeProps> {
    render() {
        return (
            <ComponentsInfoWrapper>
                <Condition condition={this.props.selectedObject}>
                    <Condition.If>
                        <ThreeMaterialList />
                        <ThreeComponentList />
                    </Condition.If>
                    <Condition.Else>
                        <div>a</div>
                    </Condition.Else>
                </Condition>
            </ComponentsInfoWrapper>
        );
    }
}

const ComponentsInfoWrapper = styled.div`
    border: 1px solid #DADADA;
    background: #fff;
    padding: 30px;
    overflow: auto;
`;
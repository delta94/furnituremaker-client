import * as React from 'react';
import styled from 'styled-components';

import { AntdLayout, Container } from '@/components';

import { DefaultLayoutFooter, DefaultLayoutHeader } from './default-layout';

const Breadcrumb = styled.div`
    margin: 20px 0;
`;

interface DefaultLayoutProps {
    readonly breadcrumb: JSX.Element;
}

export class DefaultLayout extends React.Component<DefaultLayoutProps> {
    static readonly defaultProps: Partial<DefaultLayoutProps> = {
        breadcrumb: null
    };

    render() {
        const { breadcrumb } = this.props;

        return (
            <AntdLayout style={{ minHeight: 'inherit', background: '#F7F7F7 ' }}>
                <DefaultLayoutHeader />
                {
                    breadcrumb && (
                        <Container>
                            <Breadcrumb>
                                {breadcrumb}
                            </Breadcrumb>
                        </Container>
                    )
                }
                <AntdLayout.Content style={{ display: 'flex', flexDirection: 'column' }}>
                    {this.props.children}
                </AntdLayout.Content>
                <DefaultLayoutFooter />
            </AntdLayout>
        );
    }
}
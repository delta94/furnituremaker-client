import * as React from 'react';

import { DefaultLayoutHeader } from './default-layout';
import { AntdLayout } from '@/components';

export class DefaultLayout extends React.Component {
    render() {
        return (
            <AntdLayout style={{ minHeight: 'inherit', background: '#F7F7F7 ' }}>
                <DefaultLayoutHeader />
                <AntdLayout.Content style={{ display: 'flex', flexDirection: 'column' }}>
                    {this.props.children}
                </AntdLayout.Content>
            </AntdLayout>
        );
    }
}
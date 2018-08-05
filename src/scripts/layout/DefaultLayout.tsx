import * as React from 'react';

import { DefaultLayoutHeader } from './default-layout';

export class DefaultLayout extends React.Component {
    render() {
        return (
            <div>
                <DefaultLayoutHeader />
                {this.props.children}
            </div>
        );
    }
}
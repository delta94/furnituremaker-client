import * as React from 'react';

import { MobileHeader, MobileTabbar } from './default-layout-mobile';
import { MobileDrawer } from './default-layout-mobile';

interface DefaultLayoutMobileProps {
    readonly breadcrumb: JSX.Element;
}

export class DefaultLayoutMobile extends React.Component<DefaultLayoutMobileProps> {
    static readonly defaultProps: Partial<DefaultLayoutMobileProps> = {
        breadcrumb: null
    };

    render() {

        return (
            <div
                style={{
                    minHeight: 'inherit',
                    background: '#fff'
                }}
            >
                <MobileDrawer>
                    {this.props.children}
                </MobileDrawer>
            </div>
        );
    }
}
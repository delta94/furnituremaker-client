import * as React from 'react';

import { MobileHeader, MobileTabbar } from './default-layout-mobile';

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
                <MobileHeader />
                <div
                    style={{
                        paddingBottom: 70,
                    }}
                >
                    {this.props.children}
                </div>
                <MobileTabbar />
            </div>
        );
    }
}
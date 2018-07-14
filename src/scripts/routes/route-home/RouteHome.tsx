import * as React from 'react';

import { ThreeSence, AntdRow, AntdCol } from '@/components';

export class RouteHome extends React.Component {
    static routeProps = {
        path: '/'
    };

    render() {
        return (
            <div id="home" className="page">
                <AntdRow className="h-100">
                    <AntdCol className="h-100" span={24}>
                        <ThreeSence
                            components={[
                                'sofa_design1_base1',
                                'sofa_design1_base2',
                                'sofa_design1_back1',
                                'sofa_design1_back2',
                                'sofa_design1_hands1',
                                'sofa_design1_foots1',
                                'sofa_design1_pillow1',
                                'sofa_design1_pillow2'
                            ]}
                        />
                    </AntdCol>
                </AntdRow>
            </div>
        );
    }
}
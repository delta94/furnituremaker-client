import 'ant-design-pro/lib/GlobalFooter/style/css';

import GlobalFooterType from 'ant-design-pro/lib/GlobalFooter';
import * as React from 'react';

import { AntdIcon } from '@/components';

const GlobalFooter: typeof GlobalFooterType = require('ant-design-pro/lib/GlobalFooter');

const links = [{
    key: 'furnituremaker',
    title: <span>furnituremaker.vn</span>,
    href: 'https://furnituremaker.vn',
    blankTarget: true
}];

const copyright = <div>Copyright <AntdIcon type="copyright" /> 2018 FURNITURE MAKER</div>;

export function DefaultLayoutFooter(props: {}) {
    return (
        <div style={{ overflow: 'hidden' }}>
            <GlobalFooter links={links} copyright={copyright} />
        </div>
    );
}
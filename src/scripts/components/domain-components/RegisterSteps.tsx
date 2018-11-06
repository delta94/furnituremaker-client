import * as React from 'react';

import { AntdSteps } from '../antd-component';

export interface RegisterStepsProps {
    readonly current: number;
}

export function RegisterSteps(props: RegisterStepsProps) {
    return (
        <div style={{ marginBottom: 15 }}>
            <AntdSteps direction="vertical" size="small" current={props.current}>
                <AntdSteps.Step title="Đăng ký" description="Tạo tài khoản đăng nhập" />
                <AntdSteps.Step title="Xác thực" description="Cung cấp thông tin kinh doanh" />
            </AntdSteps>
        </div>
    );
}
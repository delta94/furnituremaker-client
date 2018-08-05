import * as React from 'react';

import { AntdAlert, AntdCheckbox } from '@/components';
import styled from 'styled-components';

const Login = require('ant-design-pro/lib/Login');
const { UserName, Password, Submit } = Login;

const LoginWrapper = styled.div`
    height: 100%;
    min-height: inherit;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const LoginHeader = styled.div`
    margin-bottom: 40px;
`;

const LoginLogo = styled.img`
    width: 55px;
    height: 55px;
    display: inline-block;
    vertical-align: top;
    margin-right: 16px;
`;

const LoginSiteDescription = styled.div`
    display: inline-block;
`;

const LoginBranchName = styled.a`
    line-height: 30px;
    font-size: 33px;
    color: rgba(0,0,0,.85);
    font-weight: 600;
    position: relative;
    display: block;
`;

const LoginBranchSlogan = styled.span`
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: rgba(0,0,0,.45);
    margin-top: 12px;
`;

const LoginContent = styled.div`
    width: 100%;
    max-width: 400px;
`;

const LoginExtends = styled.div`
    margin: 0 0 30px 0;
`;

export class AppLogin extends React.Component {
    readonly state = {
        notice: '',
        type: 'tab2',
        autoLogin: true,
    };

    readonly onSubmit = (err, values) => {
        //
    }

    readonly onTabChange = (key) => {
        this.setState({
            type: key,
        });
    }

    readonly changeAutoLogin = (e) => {
        this.setState({
            autoLogin: e.target.checked,
        });
    }

    render() {
        return (
            <LoginWrapper>
                <LoginHeader>
                    <LoginLogo src="/static/assets/logo.svg" />
                    <LoginSiteDescription>
                        <LoginBranchName>Furniture Maker</LoginBranchName>
                        <LoginBranchSlogan>Chọn mua sofa theo phong cách riêng của bạn</LoginBranchSlogan>
                    </LoginSiteDescription>
                </LoginHeader>
                <LoginContent>
                    <Login
                        onTabChange={this.onTabChange}
                        onSubmit={this.onSubmit}
                    >
                        {
                            this.state.notice &&
                            <AntdAlert
                                style={{ marginBottom: 24 }}
                                message={this.state.notice}
                                type="error"
                                showIcon={true}
                                closable={true}
                            />
                        }
                        <UserName name="username" />
                        <Password name="password" />
                        <LoginExtends>
                            <AntdCheckbox
                                checked={this.state.autoLogin}
                                onChange={this.changeAutoLogin}
                            >
                                Tự động đăng nhập
                            </AntdCheckbox>
                            <a style={{ float: 'right' }} href="">Quên mật khẩu</a>
                        </LoginExtends>
                        <Submit>Đăng nhập</Submit>
                    </Login>
                </LoginContent>
            </LoginWrapper>

        );
    }
}
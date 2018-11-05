import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Auth } from '@/app/Auth';
import { AntdAlert, AntdCheckbox, Img } from '@/components';
import { LoginHeader } from '@/components';

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
    .ant-checkbox-inner {
        background-color: #000;
        border-color: #000;
    }

    .ant-btn {
        background: #FFFFFF;
        border-radius: 5px;
        color: #000;
        border-width: 0;
    }
`;

const LoginContent = styled.div`
    width: 100%;
    max-width: 340px;
`;

const LoginExtends = styled.div`
    margin: 0 0 30px 0;
`;

interface LoginFormData {
    readonly username: string;
    readonly password: string;
}

export class AppLogin extends React.Component {
    readonly state = {
        notice: '',
        autoLogin: true
    };

    readonly onSubmit = async (err, values: LoginFormData) => {
        if (err) {
            return this.setState({ notice: err });
        }
        try {
            const { username, password } = values;
            const auth = Auth.instance;
            await auth.login(username, password, this.state.autoLogin);
        } catch (error) {
            this.setState({ notice: 'Thông tin đăng nhập không chính xác' });
        }
    }

    readonly changeAutoLogin = (e) => {
        this.setState({
            autoLogin: e.target.checked,
        });
    }

    render() {
        return (
            <LoginWrapper>
                <LoginHeader />
                <LoginContent>
                    <Login onSubmit={this.onSubmit}>
                        {
                            this.state.notice &&
                            <AntdAlert
                                style={{ marginBottom: 24 }}
                                message={this.state.notice}
                                type="error"
                                showIcon={true}
                                closable={true}
                                onClose={() => this.setState({ notice: '' })}
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
                            <Link style={{ float: 'right' }} to="/forgot-password">Quên mật khẩu</Link>
                        </LoginExtends>
                        <div style={{ textAlign: 'right' }}>
                            <Submit>Đăng nhập</Submit>
                        </div>
                    </Login>
                    <div style={{ padding: 30 }}>
                        <Img className="w-100 wm-100" file="/static/assets/login-banner.png" />
                    </div>
                </LoginContent>
            </LoginWrapper>
        );
    }
}
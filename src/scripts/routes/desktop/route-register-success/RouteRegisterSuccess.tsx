import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import { AppPage, AppPageProps, Auth, PageProps, withStoreValues } from '@/app';
import { LoginHeader, Page } from '@/components';
import { CommonStoreProps } from '@/configs';

import { RouteParams } from '../route-product/RouteProduct';

const RegisterWrapper = styled.div`
    height: 100%;
    min-height: inherit;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    P {
        max-width: 340px;
        color: #fff;
        margin: 0 auto;
        text-align: justify;
    }
    img {
        max-width: 500px;
    }
`;

type RouteLoginProps = Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<RouteParams> &
    PageProps;

@withStoreValues()
export class RouteRegisterSuccess extends AppPage<RouteLoginProps & AppPageProps> {
    render() {
        if (!Auth.instance.currentUser) {
            return null;
        }

        return (
            <Page backgound="#FFC12E">
                <RegisterWrapper>
                    <LoginHeader />
                    <div>
                        <p>
                            {/* tslint:disable-next-line:max-line-length */}
                            Cảm ơn bạn đã điền thông tin. Chúng tôi sẽ xác nhận thông tin và thông báo tới bạn bằng thư điện tử hoặc tin nhắn trong vòng 48h để xác nhận tài khoản mà bạn đã đăng ký.
                        </p>
                        <img src="/static/assets/register-success.png" />
                    </div>
                </RegisterWrapper>
            </Page>
        );
    }
}
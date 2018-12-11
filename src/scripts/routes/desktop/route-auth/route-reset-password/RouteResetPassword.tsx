import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import { AppPage, AppPageProps, Auth, PageProps, withStoreValues } from '@/app';
import { LoginHeader, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { ResetPasswordControl } from '@/forms/reset-password';

const ForgotPasswordWrapper = styled.div`
    height: 100%;
    min-height: inherit;
    padding: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

type RouteLoginProps = Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<{}> &
    PageProps;

@withStoreValues()
export class RouteResetPassword extends AppPage<RouteLoginProps & AppPageProps> {
    render() {
        return (
            <Page backgound="#FFC12E">
                <ForgotPasswordWrapper>
                    <LoginHeader />
                    <ResetPasswordControl />
                </ForgotPasswordWrapper>
            </Page>
        );
    }
}
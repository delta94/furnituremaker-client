import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import {
    AppPage,
    AppPageProps,
    Auth,
    PageProps,
    readyState,
    withStoreValues
} from '@/app';
import { LoginHeader, Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { AccountVerifyFormControl } from '@/forms/account-verify-form';

const RegisterWrapper = styled.div`
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

@readyState()
@withStoreValues()
export class RouteAccountVerity extends AppPage<RouteLoginProps & AppPageProps> {
    render() {
        if (!Auth.instance.currentUser) {
            return null;
        }

        return (
            <Page backgound="#FFC12E">
                <RegisterWrapper>
                    <LoginHeader />
                    <AccountVerifyFormControl />
                </RegisterWrapper>
            </Page>
        );
    }
}
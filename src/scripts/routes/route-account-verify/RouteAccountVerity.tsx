import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import styled from 'styled-components';

import { AppPage, AppPageProps, PageProps, withStoreValues } from '@/app';
import { LoginHeader, Page } from '@/components';
import { clearToken, CommonStoreProps } from '@/configs';
import { RegisterFormControl } from '@/forms/register-form';

import { RouteParams } from '../route-product/RouteProduct';

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
    RouteComponentProps<RouteParams> &
    PageProps;

@withStoreValues()
export class RouteAccountVerity extends AppPage<RouteLoginProps & AppPageProps> {
    constructor(props: RouteLoginProps) {
        super(props);

        clearToken();
    }

    render() {
        return (
            <Page backgound="#FFC12E">
                <RegisterWrapper>
                    <LoginHeader />
                    <RegisterFormControl />
                </RegisterWrapper>
            </Page>
        );
    }
}
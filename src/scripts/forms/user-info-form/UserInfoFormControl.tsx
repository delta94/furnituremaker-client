import * as React from 'react';

import { Auth } from '@/app';
import { fetchErrorHandler } from '@/components';
import { restfulFetcher, userResources } from '@/restful';

import { UserInfoForm, UserInfoFormValues } from './user-info-form-control';

export interface UserInfoFormControlProps {
}

export class UserInfoFormControl extends React.PureComponent<UserInfoFormControlProps> {
    public render() {
        return (
            <UserInfoForm
                initialValues={Auth.instance.currentUser}
                onSubmit={this.formSubmit}
            />
        );
    }
    readonly formSubmit = async (values: UserInfoFormValues) => {
        try {
            await restfulFetcher.fetchResource(
                userResources.update,
                [{
                    type: 'path',
                    parameter: 'id',
                    value: values.id
                }, {
                    type: 'body',
                    value: values
                }]
            );
        } catch (error) {
            throw fetchErrorHandler(error);
        }
    }
}
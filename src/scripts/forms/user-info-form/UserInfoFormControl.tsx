import * as React from 'react';

import { Auth } from '@/app';

import { UserInfoForm } from './user-info-form-control';

export interface UserInfoFormControlProps {
}

export class UserInfoFormControl extends React.PureComponent<UserInfoFormControlProps> {
    public render() {
        return (
            <UserInfoForm
                initialValues={Auth.instance.currentUser}
            />
        );
    }
}
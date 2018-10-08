import * as React from 'react';
import styled from 'styled-components';

import { ProfileHeader } from './profile-container';

const ProfileContainerWrapper = styled.div`
    display: block;
`;

export interface ProfileContainerProps {
}

export class ProfileContainer extends React.PureComponent<ProfileContainerProps> {
    public render() {
        return (
            <ProfileContainerWrapper>
                <ProfileHeader />
            </ProfileContainerWrapper>
        );
    }
}

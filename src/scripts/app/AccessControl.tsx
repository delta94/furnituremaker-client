import * as React from 'react';

import { RoleType } from '@/restful';

import { Auth } from './Auth';

interface AccessControlProps {
    readonly allowRoles: RoleType | ReadonlyArray<RoleType>;
}

interface ComponentProps {
    readonly children: JSX.Element;
}

export function AllowAccess(props: ComponentProps) {
    return props.children;
}

export function DenyAccess(props: ComponentProps) {
    return props.children;
}

export class AccessControl extends React.Component<AccessControlProps> {
    static readonly isAllowed = (roleTypes: RoleType | ReadonlyArray<RoleType>) => {
        const authInstance = Auth.instance;
        const currentUser = authInstance.currentUser;
        const currentUserRole = currentUser.role.type;
        const hasRoleIn = Array.isArray(roleTypes) ?
            roleTypes.includes(currentUserRole) :
            roleTypes === currentUserRole;

        return hasRoleIn;
    }

    render() {
        const { allowRoles, children } = this.props;
        const isAllowed = AccessControl.isAllowed(allowRoles);

        if (Array.isArray(children)) {
            if (!isAllowed) {
                return children[1];
            }

            return children[0];
        }

        if (!isAllowed) {
            return null;
        }

        return children;
    }
}
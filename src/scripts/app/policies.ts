import { RoleType, User } from '@/restful';

import { Auth } from './Auth';

export const policies = {
    canViewAllOrder: () => {
        const currentUser = Auth.instance.currentUser;
        if (!currentUser.role) {
            return false;
        }
        const canViewAllOrderRole: RoleType = 'root';
        return currentUser.role.type === canViewAllOrderRole;
    },
    isAdminGroup: (user?: User) => {
        const currentUser = user || Auth.instance.currentUser;
        if (!currentUser.role) {
            return false;
        }
        const adminRole: RoleType = 'root';
        return currentUser.role.type === adminRole;
    }
};
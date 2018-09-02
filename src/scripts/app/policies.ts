import { RoleType } from '@/restful';

import { Auth } from './Auth';

export const policies = {
    canViewAllOrder: () => {
        const currentUser = Auth.instance.currentUser;
        if (!currentUser.role) {
            return false;
        }
        const canViewAllOrderRole: RoleType = 'root';
        return currentUser.role.type === canViewAllOrderRole;
    }
};
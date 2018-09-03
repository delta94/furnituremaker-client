import { Store } from 'redux';

import { InitAppStoreProps } from '@/configs';
import {
    AppNotification,
    registerSubcribeNotification
} from '@/firebase/firebaseNotificationDB';
import { User } from '@/restful';

import { policies } from './policies';
import { getStoreValue, setStoreValuesAction } from './store';

export const notificationSubscriber = (store: Store, user: User) => {
    const isAdmin = policies.isAdminGroup(user);
    registerSubcribeNotification(
        isAdmin ? 'root' : user.id,
        (notifications) => {
            if (!notifications) {
                return;
            }

            const existingNotifications = getStoreValue<Map<string, AppNotification>>(store, 'notifications');
            const newNotificationMap = new Map<string, AppNotification>(existingNotifications);

            for (const notification of notifications) {
                newNotificationMap.set(notification.id, notification);
            }

            const changeAppStateToReadyAction = setStoreValuesAction<InitAppStoreProps>(
                {
                    notifications: newNotificationMap
                },
                notificationSubscriber
            );
            store.dispatch(changeAppStateToReadyAction);
        }
    );
};
import { object } from 'prop-types';

import { User } from '@/restful/resources/user';

// tslint:disable:no-console
const map = require('lodash/map');

export type NotifiCationRefType = 'root' | User | string;

export interface AppNotification {
    readonly id?: string;
    readonly time?: string;
    readonly type: 'new-order' | 'update-order' | 'cancel-order' | 'change-order' | 'new-order-transaction';
    readonly orderId?: string;
    readonly orderRransactionId?: string;
    readonly fromUser?: string;
    readonly fromUserName?: string;
    readonly fromAgency?: string;
    readonly fromAgencyName?: string;
    readonly viewedAt?: string;
}

let firebase;
let notificationRef;
let dataCallback;

const notificationsRefUrl = 'https://furnituremaker-eaafa.firebaseio.com';
const getNowIsoString = () => (new Date()).toISOString();

export const registerNotificationDatabasse = (_firebase) => {
    firebase = _firebase;
    const firebaseDB = firebase.database();
    notificationRef = firebaseDB.refFromURL(notificationsRefUrl);
};

export const sendNotificationToFirebase = (ref: NotifiCationRefType, value: AppNotification) => {
    const notificationChildRef = notificationRef.child(`${ref}/notifications`);
    notificationChildRef.push()
        .set(value.time ? value : {
            ...value,
            time: getNowIsoString()
        });
};

export const markNotificationViewed = (ref: NotifiCationRefType, notificationId: string) => {
    const now = getNowIsoString();
    notificationRef
        .child(ref)
        .child('notifications')
        .child(notificationId)
        .child(nameof<AppNotification>(o => o.viewedAt))
        .set(now);
};

export const markNotificationNotViewed = (ref: NotifiCationRefType, notificationId: string) => {
    notificationRef
        .child(ref)
        .child('notifications')
        .child(notificationId)
        .child(nameof<AppNotification>(o => o.viewedAt))
        .set(null);
};

const snapshotValToObject = (value, key) => ({
    ...value,
    id: key
});

export const isEndOfNotificationList = async (ref, id) => {
    const notificationChildRef = notificationRef.child(`${ref}/notifications`);

    const firstChildQuery = await notificationChildRef
        .orderByKey()
        .limitToFirst(1)
        .once('value');

    const first = firstChildQuery.val();
    if (!first) {
        return true;
    }

    return Object.keys(first)[0] === id;
};

export const queryNotifications = async (ref: NotifiCationRefType, option?): Promise<AppNotification[]> => {
    const notificationChildRef = notificationRef.child(`${ref}/notifications`);

    const snapshot = await notificationChildRef
        .orderByKey()
        .endAt(option.oldestKey)
        .limitToLast(8)
        .once('value');

    const values = await snapshot.val();

    if (!values) {
        return [];
    }

    const result = map(values, snapshotValToObject);

    return result;
};

export const registerSubcribeNotification = (
    ref: NotifiCationRefType,
    callback: (notification: AppNotification[]) => void
) => {

    dataCallback = callback;

    notificationRef
        .child(`${ref}/notifications`)
        .orderByKey()
        .limitToLast(8)
        .on('value', (snapshot) => {
            const notificationSnapshotVal = snapshot.val();
            const notifications = map(notificationSnapshotVal, snapshotValToObject);

            if (!notifications) {
                return null;
            }
            callback(notifications);
        });
};
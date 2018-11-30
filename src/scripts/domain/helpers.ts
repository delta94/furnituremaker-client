import { AppNotification } from '@/firebase/firebaseNotificationDB';

const orderBy = require('lodash/orderBy');

export const getNotificationTyleLabel = (notification) => {
    switch (notification.type) {
        case 'new-order':
            return 'tạo một';
        case 'update-order':
            return 'cập nhật';
        case 'cancel-order':
            return 'hủy';
        case 'change-order':
            return 'yêu cầu đổi trả';
        default:
            return '';
    }
};

export const notificationMapToArray = (notifications: Map<string, {}>): Array<AppNotification> => {
    const array = Array.from(notifications.values());
    return orderBy(array, 'time', 'DESC');
};
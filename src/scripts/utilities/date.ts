import * as moment from 'moment';

export const toVNDay = (date: Date | string) => {
    const dateMoment = moment(date);
    const day = dateMoment.get('day');
    switch (day) {
        case 0:
            return 'Chủ nhật';
        case 1:
            return 'Thứ hai';
        case 2:
            return 'Thứ ba';
        case 3:
            return 'Thứ tư';
        case 4:
            return 'Thứ năm';
        case 5:
            return 'Thứ sáu';
        case 6:
        default:
            return 'Thứ bảy';
    }
};

export const formatDate = (date: Date | string, format: string) => {
    const dateMoment = moment(date);
    return dateMoment.format(format);
};
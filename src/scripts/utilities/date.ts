import * as moment from 'moment';

export const formatDate = (date: Date | string, format: string) => {
    const dateMoment = moment(date);
    return dateMoment.format(format);
};
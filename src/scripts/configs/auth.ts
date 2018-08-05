import * as Cookies from 'js-cookie';
const jwtDecode = require('jwt-decode');

export const getToken = (): string => {
    const tokenFormCookies = Cookies.get('token');
    if (tokenFormCookies) {
        return Cookies.get('token');
    }
    return window.sessionStorage.getItem('token');
};

export const saveToken = (token: string, isRememberMe: boolean) => {
    if (isRememberMe) {
        Cookies.set('token', token, { expires: 7 });
    } else {
        window.sessionStorage.setItem('token', token);
    }
};

export const clearToken = () => {
    Cookies.remove('token');
};
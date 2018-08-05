import * as Cookies from 'js-cookie';
import { apiEntry } from '@/restful/apiEntry';
import { User } from '@/restful';

const jwtDecode = require('jwt-decode');

interface AuthProps {
    readonly loginPath: string;
}

interface LoginResponse {
    readonly user: User;
    readonly jwt: string;
}

export class Auth {
    readonly configs: AuthProps;

    constructor(props: AuthProps) {
        this.configs = props;
    }

    isLoggedIn() {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        return this.verifyToken(token);
    }

    async login(identifier: string, password: string, isRememberMe: boolean) {
        try {
            const loginUrl = apiEntry('/auth/local');
            const login = await fetch(loginUrl, {
                method: 'POST',
                body: JSON.stringify({
                    identifier: identifier,
                    password: password
                })
            });

            if (!login.ok) {
                throw await login.text();
            }

            const { user, jwt } = await login.json() as LoginResponse;

            this.saveToken(jwt, isRememberMe);

        } catch (error) {
            throw new Error(error);
        }
    }

    private readonly getToken = () => Cookies.get('token');

    private readonly verifyToken = async (token: string) => {
        const user = await fetch('http://v2-api.furnituremaker.vn/user/me');
        const decoded = jwtDecode(token);
        return false;
    }

    private readonly saveToken = (token: string, isRememberMe: boolean) => Cookies.set('token', token, { expires: 7 });
}
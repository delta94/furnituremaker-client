import { Store } from 'redux';
import { History } from 'history';

import { resfulFetcher, userResources, UserAuthResponse, User } from '@/restful';
import { saveToken, clearToken } from '@/configs';
import { getUrlSearchParam } from '@/utilities';

import { changeAppStateToReady } from './readyState';

interface AuthProps {
    readonly loginPath: string;
    /** To navigate user after a action  */
    readonly history: History;
    readonly store: Store;
}

export class Auth {

    // tslint:disable-next-line:readonly-keyword
    static _instance: Auth;
    static get instance() {
        return Auth._instance;
    }
    static set instance(instance: Auth) {
        if (Auth._instance) {
            throw Error('Only one Auth!');
        }
        Auth._instance = instance;
    }

    // tslint:disable-next-line:member-ordering
    readonly props: AuthProps;

    constructor(props: AuthProps) {
        this.props = props;

        Auth.instance = this;
    }

    async isLoggedIn() {
        try {
            const user: User = await resfulFetcher.fetchResource(userResources.me, []);
            return user;
        } catch (error) {
            const { loginPath, history } = this.props;
            throw () => history.replace(loginPath);
        }
    }

    async login(identifier: string, password: string, isRememberMe: boolean) {
        try {
            const login: UserAuthResponse = await resfulFetcher.fetchResource(
                userResources.auth,
                [{
                    type: 'body',
                    value: {
                        identifier: identifier,
                        password: password
                    }
                }]
            );

            saveToken(login.jwt, isRememberMe);

            changeAppStateToReady(this.props.store).then(() => {
                const returnUrlParam = getUrlSearchParam('returnUrl');
                const returnPath = returnUrlParam ? returnUrlParam : '/';
                this.props.history.replace(returnPath);
            });

            return true;
        } catch (error) {
            throw error;
        }
    }

    readonly logout = () => {
        const { loginPath } = this.props;
        clearToken();
        this.props.history.replace(loginPath);
    }
}
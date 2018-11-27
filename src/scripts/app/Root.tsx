import './Root.scss';

import { createBrowserHistory, History } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Switch } from 'react-router-dom';
import { AnyAction, Store } from 'redux';

import { queryNotifications } from '@/firebase/firebaseNotificationDB';
import {
    Agency,
    agencyResources,
    discountByQuantitiesResources,
    furnitureMaterialResources,
    OrderDetail,
    orderDetailResources,
    orderDetailUtils,
    productDiscountResources,
    productTypeResources,
    restfulFetcher,
    User
} from '@/restful';

import { Auth } from './Auth';
import { initAppStore } from './initAppStore';
import { notificationSubscriber } from './notificationSubscriber';
import { policies } from './policies';
import { changeAppStateToReady } from './readyState';

export interface RootProps {
    readonly store: Store<string, AnyAction>;
    readonly children: React.ComponentType;
    readonly loginPath: string;
}

export class Root extends React.Component<RootProps> {
    readonly authHelper: Auth;
    readonly history: History;

    readonly state = {
        allowLoad: false
    };

    constructor(props: RootProps) {
        super(props);
        const { loginPath, store } = props;
        this.history = createBrowserHistory();
        this.authHelper = new Auth({
            loginPath: loginPath,
            store: store,
            history: this.history,
        });
        this.authHelper
            .isLoggedIn()
            .catch((toLoginPage: Function) => {
                if (
                    location.pathname.startsWith('/register') ||
                    location.pathname.startsWith('/account-verity') ||
                    location.pathname.startsWith('/forgot-password') ||
                    location.pathname.startsWith('/reset-password')
                ) {
                    throw '!';
                }

                throw toLoginPage();
            })
            .then((user) => {
                this.authHelper.currentUser = user;
                if (!user.confirmed) {
                    if (user.accountRequest) {
                        throw this.history.replace('/register-success');
                    }
                    throw this.history.replace('/account-verify');
                }
                return user;
            })
            .then(this.appInit)
            .then((user) => {
                notificationSubscriber(store, this.authHelper.currentUser);
                changeAppStateToReady(store);
            });
    }

    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <this.props.children />
            </Provider>
        );
    }

    readonly appInit = async (user: User): Promise<User> => {
        try {
            await Promise.all([
                restfulFetcher.fetchResource(
                    orderDetailResources.find,
                    [
                        orderDetailUtils.getTempOrderParameter(),
                        {
                            type: 'query',
                            parameter: nameof<OrderDetail>(o => o.created_by),
                            value: user.id
                        }
                    ]
                ),
                restfulFetcher.fetchResource(furnitureMaterialResources.find, []),
                restfulFetcher.fetchResource(productTypeResources.find, []),
                restfulFetcher.fetchResource(discountByQuantitiesResources.find, []),
                restfulFetcher.fetchResource(productDiscountResources.find, [{
                    type: 'query',
                    parameter: 'enabled',
                    value: undefined
                }])
            ]);

            initAppStore(this.props.store, {
                history: this.history,
                notifications: new Map()
            });

            const userAgencies = await restfulFetcher.fetchResource(
                agencyResources.find,
                [{
                    parameter: nameof<Agency>(o => o.user),
                    type: 'query',
                    value: user.id
                }]
            );

            const userAgency = userAgencies[0];

            return {
                ...user,
                agency: userAgency
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    async initUserNotifications(user: User) {
        const isAdmin = policies.isAdminGroup(user);
        if (isAdmin) {
            await queryNotifications('root');
        } else {
            await queryNotifications(user.id);
        }
    }
}
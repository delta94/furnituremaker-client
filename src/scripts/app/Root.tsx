import './Root.scss';

import autobind from 'autobind-decorator';
import { createBrowserHistory, History } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Switch } from 'react-router-dom';
import { AnyAction, Store } from 'redux';

import { initAppStore } from '@/app/initAppStore';
import {
    discountByQuantitiesResources,
    furnutureMaterialResources,
    orderDetailResources,
    orderDetailUtils,
    productTypeResources,
    User
} from '@/restful';
import { restfulFetcher } from '@/restful';

import { Auth } from './Auth';
import { changeAppStateToReady } from './readyState';

export interface RootProps {
    // tslint:disable-next-line:no-any
    readonly store: Store<any, AnyAction>;
    readonly children: JSX.Element[];
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

        this.history = createBrowserHistory();
        this.authHelper = new Auth({
            loginPath: props.loginPath,
            store: props.store,
            history: this.history,
        });
        this.authHelper
            .isLoggedIn()
            .then(this.appInit)
            .catch((toLoginPage: () => void) => {
                return toLoginPage();
            });
    }

    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <Router history={this.history}>
                    <Switch>
                        {this.props.children}
                    </Switch>
                </Router>
            </Provider>
        );
    }

    @autobind
    async appInit(user: User) {
        await Promise.all([
            restfulFetcher.fetchResource(
                orderDetailResources.find,
                [orderDetailUtils.getTempOrderParameter]
            ),
            restfulFetcher.fetchResource(furnutureMaterialResources.find, []),
            restfulFetcher.fetchResource(productTypeResources.find, []),
            restfulFetcher.fetchResource(discountByQuantitiesResources.find, [])
        ]);

        initAppStore(this.props.store, {
            history: this.history
        });

        this.authHelper.currentUser = user;
        changeAppStateToReady(this.props.store);
    }
}
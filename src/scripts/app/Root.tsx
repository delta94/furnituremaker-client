import './Root.scss';

import * as React from 'react';
import { Store, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory, History } from 'history';
import autobind from 'autobind-decorator';
import { Router } from 'react-router';
import { Switch } from 'react-router-dom';

import { User, orderDetailResources, orderDetailUtils, furnutureMaterialResources } from '@/restful';
import { resfulFetcher } from '@/restful';

import { Auth } from './Auth';
import { changeAppStateToReady } from './readyState';

export interface RootProps {
    readonly store: Store<unknown, AnyAction>;
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
            resfulFetcher.fetchResource(
                orderDetailResources.find,
                [orderDetailUtils.getTempOrderParameter]
            ),
            resfulFetcher.fetchResource(furnutureMaterialResources.find, []),
            resfulFetcher.fetchResource(orderDetailResources.find, [])
        ]);

        changeAppStateToReady(this.props.store);
    }
}
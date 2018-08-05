import './Root.scss';

import * as React from 'react';
import { Store, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory, History } from 'history';

import { Router } from 'react-router';
import { Switch } from 'react-router-dom';
import { Auth } from '@/app/Auth';
import { changeAppStateToReady } from '@/app/readyState';

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
            .then(() => changeAppStateToReady(this.props.store))
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
}
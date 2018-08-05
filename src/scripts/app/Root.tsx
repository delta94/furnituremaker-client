// * Package styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './Root.scss';

import * as React from 'react';
import { Store, AnyAction } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory, History } from 'history';

import { Router } from 'react-router';
import { Switch } from 'react-router-dom';
import { Auth } from '@/app/Auth';

export interface RootProps {
    readonly store: Store<unknown, AnyAction>;
    readonly children: JSX.Element[];
    readonly loginPath: string;
}

export class Root extends React.Component<RootProps> {
    readonly authHelper: Auth;
    readonly history: History;

    constructor(props: RootProps) {
        super(props);

        this.authHelper = new Auth({
            loginPath: props.loginPath
        });
        this.history = createBrowserHistory();
    }

    componentDidMount() {
        const isUserLoggedIn = this.authHelper.isLoggedIn();
        if (!isUserLoggedIn) {
            return this.history.push(this.props.loginPath);
        }
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
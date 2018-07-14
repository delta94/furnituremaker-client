import './Root.scss';

import * as React from 'react';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import { Router } from 'react-router';
import { Switch } from 'react-router-dom';

export interface RootProps {
    // tslint:disable-next-line:no-any
    store: any;
    children: JSX.Element[];
}

export class Root extends React.Component<RootProps> {
    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <Router history={createBrowserHistory()}>
                    <Switch>
                        {this.props.children}
                    </Switch>
                </Router>
            </Provider>
        );
    }
}
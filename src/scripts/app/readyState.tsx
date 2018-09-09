import * as React from 'react';
import { Store } from 'redux';

import { CommonStoreProps } from '@/configs';

import { AppRouteComponent } from './route';
import { setStoreValuesAction, withStoreValues } from './store';

/**
 * Allow Route's Component render when appState is READY
 * @return {React.StatelessComponent}
 */
export function readyState() {
    return (Component: AppRouteComponent) => {
        const withAppState = withStoreValues(
            nameof<CommonStoreProps>(o => o.appState)
        )((props: CommonStoreProps) => {
            if (props.appState !== 'READY') {
                return null;
            }
            // tslint:disable-next-line:no-any
            return <Component {...props as any}/>;
        });

        return withAppState;
    };
}

export const changeAppStateToReady = (store: Store) => {
    return new Promise((resolve) => {
        const appStateValue: CommonStoreProps = { appState: 'READY' };
        const changeAppStateToReadyAction = setStoreValuesAction(appStateValue, this);
        store.dispatch(changeAppStateToReadyAction);
        resolve();
    });
};
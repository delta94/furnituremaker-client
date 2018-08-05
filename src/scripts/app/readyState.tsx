import * as React from 'react';
import { Store } from 'redux';

import { CommonStoreProps } from '@/configs';

import { withStoreValues, setStoreValuesAction } from './store';
import { AppRouteComponent } from './route';

/**
 * Allow Route's Component render when appState is READY
 * @return {React.StatelessComponent}
 */
export function readyState() {
    return (Component: AppRouteComponent) => {
        if (!Component.routeProps) {
            throw new Error(`Apply for Route's Component only!`);
        }

        const withAppState = withStoreValues(
            nameof<CommonStoreProps>(o => o.appState)
        )((props: CommonStoreProps) => {
            if (props.appState !== 'READY') {
                return null;
            }
            return <Component />;
        });

        withAppState.routeProps = Component.routeProps;
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
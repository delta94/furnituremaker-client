import { Store } from 'redux';

import { InitAppStoreProps } from '@/configs';

import { setStoreValuesAction } from './store';

export const initAppStore = (store: Store, initAppStoreProps: InitAppStoreProps) => {
    const changeAppStateToReadyAction = setStoreValuesAction(initAppStoreProps, this);
    store.dispatch(changeAppStateToReadyAction);
};
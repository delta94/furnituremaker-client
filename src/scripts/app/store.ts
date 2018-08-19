import { connect } from 'react-redux';
import { Action, Dispatch, Store } from 'redux';

const map = require('lodash/map');

export interface WithStoreValuesDispatchs {
    readonly dispatch?: Dispatch;
    readonly setStore?: <T = {}>(values: Partial<T>) => void;
    readonly checkStore?: <T>(key: string) => Promise<T>;
}

export type ExtendWithStoreValuesProps<T> = WithStoreValuesDispatchs & T;

interface StoreValuesRecuder extends Action {
    readonly values: object;
}

const initStoreValues = new Map();

// tslint:disable-next-line:no-any
export function storeValuesRecuder(state: Map<string, any> = initStoreValues, action: StoreValuesRecuder) {
    switch (action.type) {
        case 'SET_VALUES':
            const newState = new Map(state);
            for (const key in action.values) {
                if (action.values.hasOwnProperty(key)) {
                    const value = action.values[key];
                    if (value === undefined || value === null) {
                        newState.delete(key);
                        continue;
                    }
                    newState.set(key, value);
                }
            }
            return newState;
        default:
            return state;
    }
}

interface CheckStoreAction extends Action<string> {
    readonly key: string;
    // tslint:disable-next-line:no-any
    readonly resolve: (value: any) => void;
}

export const checkStoreAction = (key: string, resolve: CheckStoreAction['resolve']): CheckStoreAction => {
    return {
        type: 'CHECK_STORE',
        key,
        resolve
    };
};

export const storeValuesMiddleware = (store: Store) => next => (action: CheckStoreAction) => {
    if (action.type === 'CHECK_STORE') {
        // tslint:disable-next-line:no-any
        const state: { readonly values: Map<string, any> } = store.getState();
        action.resolve(state.values.get(action.key));
    }
    return next(action);
};

export const setStoreValuesAction = (values: {}, source) => {
    const keys = map(values, (value, key) => key);
    return {
        type: 'SET_VALUES',
        values: values,
        keys: keys,
        source: source
    };
};

// tslint:disable-next-line:no-any
export function withStoreValues<T = {}>(...keys: Array<keyof T>): any {
    return (Component) => {
        const mapStateToProps = ({ values }) => {
            if (!keys) {
                return {};
            }

            const keysReducer = (reducerValue, currentKey) => {
                reducerValue[currentKey] = values.get(currentKey);
                return reducerValue;
            };
            const state = keys.reduce(keysReducer, {});
            return state;
        };

        function mapDispatchToProps(dispatch: Dispatch) {
            return {
                dispatch,
                setStore: (values: {}) => {
                    const action = setStoreValuesAction(values, Component);
                    return dispatch(action);
                },
                checkStore: (key: string) => {
                    return new Promise((resolve) => {
                        const action = checkStoreAction(key, resolve);
                        dispatch(action);
                    });
                }
            };
        }
        return connect(mapStateToProps, mapDispatchToProps)(Component);
    };
}
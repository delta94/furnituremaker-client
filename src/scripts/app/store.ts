import { Dispatch, Action, Store } from 'redux';
import { connect } from 'react-redux';

const map = require('lodash/map');

export interface WithStoreValuesDispatchs {
    readonly setStore?: (values: object) => void;
    readonly checkStore?: <T>(key: string) => Promise<T>;
}

export type ExtendWithStoreValuesProps<T> = WithStoreValuesDispatchs & T;

interface StoreValuesRecuder extends Action {
    readonly values: object;
}

const initStoreValues = new Map();

export function storeValuesRecuder(state: Map<string, unknown> = initStoreValues, action: StoreValuesRecuder) {
    switch (action.type) {
        case 'SET_VALUES':
            for (const key in action.values) {
                if (action.values.hasOwnProperty(key)) {
                    const value = action.values[key];
                    if (!value) {
                        state.delete(key);
                        continue;
                    }
                    state.set(key, value);
                }
            }
            return new Map(state);
        default:
            return state;
    }
}

interface CheckStoreAction extends Action<string> {
    readonly key: string;
    readonly resolve: (value: unknown) => void;
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
        const state: { readonly values: Map<string, unknown> } = store.getState();
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
export function withStoreValues(...keys: string[]): any {
    return (Component) => {
        const mapStateToProps = ({ values }) => {
            if (!keys) {
                return {};
            }

            const keysReducer = (reducerValue, currentKey) => {
                reducerValue[currentKey] = values.get(currentKey);
                return reducerValue;
            };
            return keys.reduce(keysReducer, {});
        };

        function mapDispatchToProps(dispatch: Dispatch) {
            return {
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
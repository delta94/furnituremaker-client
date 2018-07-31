import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';

import map from 'lodash/map';

export interface WithStoreValuesProps {
    readonly setStore?: (values: object) => void;
}

export type ExtendWithStoreValuesProps<T> = WithStoreValuesProps & T;

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
                setStore: (values) => {
                    const action = setStoreValuesAction(values, Component);
                    return dispatch(action);
                }
            };
        }
        return connect(mapStateToProps, mapDispatchToProps)(Component);
    };
}
import * as React from 'react';
import { RouteComponentProps, RouteProps } from 'react-router';

import { readyState, withStoreValues } from '@/app';
import { CommonStoreProps } from '@/configs';

type RouteHomeProps = CommonStoreProps & RouteComponentProps<{}>;

@readyState()
@withStoreValues()
export class RouteHome extends React.Component<RouteHomeProps> {
    static readonly routeProps: RouteProps = {
        path: '/',
        exact: true
    };

    constructor(props: RouteHomeProps) {
        super(props);

        props.history.replace('/maker');
    }

    render() {
        return null;
    }
}
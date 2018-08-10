import * as React from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';

export type AppRouteComponentProps<T> = RouteComponentProps<T>;

export type AppRouteComponent = React.ComponentType & {
    readonly routeProps: RouteProps
};

// tslint:disable-next-line:no-any
export const route = (Component: AppRouteComponent): any => {
    // tslint:disable-next-line:no-string-literal
    const routeProps = Component.routeProps;

    return (
        <Route key={routeProps.path} {...routeProps} component={Component} />
    );
};
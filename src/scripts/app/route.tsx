import * as React from 'react';
import { Route, RouteComponentProps, RouteProps } from 'react-router-dom';

export type AppRouteComponentProps<T> = RouteComponentProps<T>;

export interface PageProps {
    readonly routeProps: RouteProps;
}

export type AppRouteComponent = React.ComponentType<PageProps>;

export const route = (Component: AppRouteComponent) => {
    const routeProps = Component.defaultProps.routeProps;

    return (
        <Route key={routeProps.path as string} {...routeProps} component={Component} />
    );
};
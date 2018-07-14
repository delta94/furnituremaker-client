import * as React from 'react';
import { Route } from 'react-router-dom';

// tslint:disable-next-line:no-any
export const route = (Component: React.ComponentType): any => {
    // tslint:disable-next-line:no-string-literal
    const routeProps = Component['routeProps'];
    
    return (
        <Route key={routeProps.path} {...routeProps} component={Component} />
    );
};
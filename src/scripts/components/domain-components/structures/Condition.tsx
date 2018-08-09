import * as React from 'react';

interface ConditionProps {
    // tslint:disable-next-line:no-any
    readonly condition: any;
}

export class Condition extends React.Component<ConditionProps> {
    readonly static Then = ({ children }) => (<React.Fragment>{children}</React.Fragment>);
    readonly static Else = ({ children }) => (<React.Fragment>{children}</React.Fragment>);
    render() {
        const { condition, children } = this.props;
        if (condition) {
            const childIf = Array.isArray(children) ? children[0] : children;
            return childIf;
        }
        const childElse = children[1] || null;
        return childElse;
    }
}
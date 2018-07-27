import * as React from 'react';

interface ConditionProps {
    // tslint:disable-next-line:no-any
    condition: any;
}

export class Condition extends React.Component<ConditionProps> {
    static If = ({ children }) => (<React.Fragment>{children}</React.Fragment>);
    static Else = ({ children }) => (<React.Fragment>{children}</React.Fragment>);
    render() {
        const { condition, children } = this.props;
        if (condition) {
            const childIf = children[0];
            return childIf;
        }
        const childElse = children[1];
        return childElse;
    }
}
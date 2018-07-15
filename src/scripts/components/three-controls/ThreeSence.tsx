// tslint:disable:no-string-literal
// tslint:disable:no-console

import './ThreeSence.scss';

import * as React from 'react';
import { ThreeSenceBase } from './ThreeSenceBase';

export class ThreeSence extends ThreeSenceBase {
    render() {
        return (<div id="threeViewWindow" ref={(element) => this.container = element} />);
    }
}
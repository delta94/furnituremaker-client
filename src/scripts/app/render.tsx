import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Root, RootProps } from '@/app/Root';

const rootElement = window.document.getElementById('root');

export function render(options: RootProps) {
    ReactDOM.render(<Root {...options}/>, rootElement);
}
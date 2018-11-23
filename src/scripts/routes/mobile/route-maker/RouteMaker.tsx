import * as React from 'react';

import { readyState, withStoreValues } from '@/app';
import { Page } from '@/components';
import { RouteMakerBase } from '@/routes/shared';

@readyState()
@withStoreValues()
export class RouteMaker extends RouteMakerBase {
    render() {
        if (!this.state.pageReady) {
            return null;
        }

        return (
            <Page>
                {null}
            </Page >
        );
    }
}
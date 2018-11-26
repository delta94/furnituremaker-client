import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import { Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';
import {
    LandingSliderContainer
} from '@/routes/desktop/route-landing/containers';
import {
    LandingFeature,
    LandingFeature2,
    LandingFeature3,
    LandingProductDetail,
    LandingProductDetail2,
    LandingProgress
} from '@/routes/desktop/route-landing/presentations';

type RouteLandingProps =
    Pick<CommonStoreProps, 'setStore'> &
    RouteComponentProps<{}> &
    PageProps;

@readyState()
@withStoreValues<RouteLandingProps>()
export class RouteLanding extends AppPage<RouteLandingProps> {
    render() {
        return (
            <Page>
                <LandingSliderContainer />
                <LandingFeature />
                <LandingProductDetail />
                <LandingFeature2 />
                <LandingProductDetail2 />
                <LandingFeature3 />
                <LandingProgress />
            </Page>
        );
    }
}
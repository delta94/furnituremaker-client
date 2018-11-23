import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { AppPage, PageProps, readyState, withStoreValues } from '@/app';
import { Page } from '@/components';
import { CommonStoreProps } from '@/configs';
import { DefaultLayout } from '@/layout';

import { LandingSliderContainer } from './containers';
import {
    LandingFeature,
    LandingFeature2,
    LandingFeature3,
    LandingProductDetail,
    LandingProductDetail2,
    LandingProgress
} from './presentations';

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
                <DefaultLayout>
                    <LandingSliderContainer />
                    <LandingFeature />
                    <LandingProductDetail />
                    <LandingFeature2 />
                    <LandingProductDetail2 />
                    <LandingFeature3 />
                    <LandingProgress />
                </DefaultLayout>
            </Page>
        );
    }
}
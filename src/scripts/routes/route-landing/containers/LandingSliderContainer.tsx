import * as React from 'react';
import { RestfulComponentRenderProps, RestfulRender } from 'react-restful';

import { restfulFetcher, Slide, slideResources } from '@/restful';

import { LandingSlider } from './landing-slider-container';

export interface LandingSliderContainerProps {

}

export class LandingSliderContainer extends React.PureComponent<LandingSliderContainerProps> {
    public render() {
        return (
            <RestfulRender
                fetcher={restfulFetcher}
                resource={slideResources.find}
                render={this.renderSlider}
            />
        );
    }

    readonly renderSlider = (renderProps: RestfulComponentRenderProps<Slide[]>) => {
        const { data } = renderProps;
        if (!data) {
            return null;
        }
        
        return <LandingSlider slides={data} />;
    }
}

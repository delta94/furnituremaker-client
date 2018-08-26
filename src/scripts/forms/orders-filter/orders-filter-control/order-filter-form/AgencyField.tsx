import * as React from 'react';
import { RestfulRender } from 'react-restful';
import { Field } from 'redux-form';

import { renderSelectField } from '@/components';
import {
    agencyResources,
    restfulFetcher,
    restfulStore,
    withAllAgencies,
    WithAllAgenciesProps
} from '@/restful';

import { OrderFilterFormValues } from '../OrderFilterForm';

interface AgencyFieldProps {
    readonly onChange: (event: React.ChangeEvent<unknown>, value: string) => void;
}

export class AgencyField extends React.PureComponent<AgencyFieldProps> {
    readonly RenderField = withAllAgencies(restfulStore)((props: WithAllAgenciesProps) => {
        const { onChange } = this.props;
        return (
            <Field
                name={nameof<OrderFilterFormValues>(o => o.agencyOrderer)}
                items={props.agencies.map(o => ({ value: o.id, title: o.name }))}
                component={renderSelectField}
                onChange={onChange}
                selectProps={{
                    placeholder: 'Đại lý',
                    allowClear: true
                }}
            />
        );
    });

    render() {
        return (
            <RestfulRender
                fetcher={restfulFetcher}
                store={restfulStore}
                resource={agencyResources.find}
                parameters={[]}
                render={(renderProps) => {
                    if (renderProps.data && !renderProps.fetching) {
                        return (<this.RenderField data={renderProps.data} />);
                    }
                    return null;
                }}
            />
        );
    }
}
import * as React from 'react';
import { AntdAlert } from './Alert';

export const FormError = (props: { readonly error: string }) => {
    const { error } = props;

    if (!error) {
        return null;
    }
    return (
        <AntdAlert
            style={{ marginBottom: 24 }}
            message={error}
            type="error"
            showIcon={true}
            closable={true}
        />
    );
};
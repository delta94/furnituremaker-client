import { Moment } from 'moment';
import * as React from 'react';
import { Field, Form, InjectedFormProps, reduxForm } from 'redux-form';

import {
    AntdCol,
    AntdRow,
    FormError,
    renderDatePickerField,
    renderInput,
    renderInputNumber,
    renderSelectField,
    renderTextArea,
    renderUploadField,
    RenderUploadPictureField
} from '@/components';
import { FurnitureComponent, Order, orderUtils } from '@/restful';

export interface CreateComponentFormProps {

}

export interface CreateComponentFormValues extends
    Pick<FurnitureComponent, 'name'>,
    Pick<FurnitureComponent, 'quotaValue'>,
    Pick<FurnitureComponent, 'price'>,
    Pick<FurnitureComponent, 'displayName'> {
}

class CreateComponentFormComponent extends React.Component<
    CreateComponentFormProps &
    InjectedFormProps<CreateComponentFormValues, CreateComponentFormProps>
    > {
    render() {
        const { handleSubmit, error } = this.props;
        return (
            <Form onSubmit={handleSubmit}>
                <FormError error={error} />
                <AntdRow gutter={15}>
                    <AntdCol span={12}>
                        <Field
                            name={nameof<CreateComponentFormValues>(o => o.name)}
                            component={RenderUploadPictureField}
                            label="Ảnh hiển thị"
                            required={true}
                            uploadProps={{
                                placeholder: 'Chọn ảnh'
                            }}
                        />
                    </AntdCol>
                    <AntdCol span={12}>
                        <Field
                            name={nameof<CreateComponentFormValues>(o => o.name)}
                            component={renderUploadField}
                            label="OBJ file"
                            required={true}
                            uploadProps={{
                                placeholder: 'Chọn MTL file',
                                accept: '.obj'
                            }}
                        />
                    </AntdCol>
                    <AntdCol span={12}>
                        <Field
                            name={nameof<CreateComponentFormValues>(o => o.name)}
                            component={renderUploadField}
                            label="OBJ file"
                            required={true}
                            uploadProps={{
                                placeholder: 'Chọn MTL file',
                                accept: '.mtl'
                            }}
                        />
                    </AntdCol>
                    <AntdCol span={12}>
                        <Field
                            name={nameof<CreateComponentFormValues>(o => o.name)}
                            component={renderInput}
                            label="Tên cấu kiện"
                            required={true}
                            inputProps={{
                                placeholder: 'Nhập tên cấu kiện'
                            }}
                        />
                    </AntdCol>
                    <AntdCol span={12}>
                        <Field
                            name={nameof<CreateComponentFormValues>(o => o.displayName)}
                            component={renderInput}
                            label="Tên hiển thị"
                            required={true}
                            inputProps={{
                                placeholder: 'Nhập tên hiển thị'
                            }}
                        />
                    </AntdCol>
                    <AntdCol span={12}>
                        <Field
                            name={nameof<CreateComponentFormValues>(o => o.quotaValue)}
                            component={renderInputNumber}
                            label="Định mức vật liệu"
                            required={true}
                            inputProps={{
                                placeholder: 'Nhập định mức vật liệu',
                                className: 'w-100'
                            }}
                        />
                    </AntdCol>
                    <AntdCol span={12}>
                        <Field
                            name={nameof<CreateComponentFormValues>(o => o.price)}
                            component={renderInputNumber}
                            label="Giá"
                            required={true}
                            inputProps={{
                                placeholder: 'Nhập giá',
                                className: 'w-100'
                            }}
                        />
                    </AntdCol>
                </AntdRow>
            </Form>
        );
    }
}

export const CreateComponentForm = reduxForm<CreateComponentFormValues, CreateComponentFormProps>({
    form: 'UpdateOrder'
})(CreateComponentFormComponent);
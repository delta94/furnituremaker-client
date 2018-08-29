// tslint:disable:no-any
import * as Upload from 'antd/lib/upload';
import { UploadProps as AntdUploadProps } from 'antd/lib/upload';

export { AntdUploadProps };

export const AntdUpload: typeof Upload['default'] = Upload as any;
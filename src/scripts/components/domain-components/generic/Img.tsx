import * as React from 'react';

import { ImgSize, UploadedFile, uploadedFileUtils } from '@/restful';

interface ImgProps extends React.ImgHTMLAttributes<{}> {
    readonly file: UploadedFile | string;
    readonly size?: ImgSize;
}

export class Img extends React.Component<ImgProps> {
    static readonly getDefaultImgSrc = () => `/static/assets/no-image.png`;

    render() {
        const { file, size } = this.props;
        const imgSrc = file ?
            (typeof file === 'string') ? file : uploadedFileUtils.getUrl(file, size) :
            Img.getDefaultImgSrc();

        const passedProps = { ...this.props, file: undefined };
        return <img style={{ maxWidth: '100%' }} {...passedProps} src={imgSrc} />;
    }
}
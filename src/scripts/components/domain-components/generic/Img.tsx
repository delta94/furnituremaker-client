import * as React from 'react';
import { UploadedFile, uploadedFileUtils } from '@/restful';

interface ImgProps extends React.ImgHTMLAttributes<{}> {
    readonly file: UploadedFile;
}

export class Img extends React.Component<ImgProps> {
    static readonly getDefaultImgSrc = () => `/static/assets/no-image.png`;

    render() {
        const { file } = this.props;
        const imgSrc = file ? uploadedFileUtils.getUrl(file) : Img.getDefaultImgSrc();

        const passedProps = { ...this.props, file: undefined };
        return <img {...passedProps} src={imgSrc} />;
    }
}
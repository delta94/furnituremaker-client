import * as React from 'react';
import { UploadedFile } from '@/restful';

interface ImgProps extends React.ImgHTMLAttributes<{}> {
    readonly file: UploadedFile;
}

export class Img extends React.Component<ImgProps> {
    static readonly getFileHostOrigin = () => 'http://localhost:1337';
    static readonly getImgSrcFromFile = (file: UploadedFile) => `${Img.getFileHostOrigin()}${file.url}`;
    static readonly getDefaultImgSrc = () => `/static/assets/no-image.png`;

    render() {
        const { file } = this.props;
        const imgSrc = file ? Img.getImgSrcFromFile(file) : Img.getDefaultImgSrc();

        const passedProps = { ...this.props, file: undefined };
        return <img {...passedProps} src={imgSrc} />;
    }
}
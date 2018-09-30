import * as React from 'react';

import { ImgSize, UploadedFile, uploadedFileUtils } from '@/restful';

interface ImgProps extends React.ImgHTMLAttributes<{}> {
    readonly file: UploadedFile | string;
    readonly size?: ImgSize;
}

export class Img extends React.Component<ImgProps> {
    static readonly getDefaultImgSrc = () => `/static/assets/no-image.png`;
    readonly getSrc = () => {
        const { file, size } = this.props;

        if (!file) {
            return Img.getDefaultImgSrc();
        }

        if (typeof file === 'string') {
            if (file.startsWith('/uploads')) {
                return uploadedFileUtils.addHostToPath(file);
            }
            return file;
        }

        return uploadedFileUtils.getUrl(file, size);
    }

    render() {
        const imgSrc = this.getSrc();

        const passedProps = { ...this.props, file: undefined };
        return <img {...passedProps} src={imgSrc} />;
    }
}
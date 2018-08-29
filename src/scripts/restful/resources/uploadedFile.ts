export interface UploadedFile {
    readonly id?: string;
    readonly name?: string;
    readonly hash?: string;
    readonly ext?: string;
    readonly size?: number;
    readonly url?: string;
    readonly provider?: string;
    readonly img256x256?: string;
    readonly img512x512?: string;
    readonly img1024x1024?: string;
}

export type ImgSize = 'img256x256' | 'img512x512' | 'img1024x1024';

export const uploadedFileUtils = {
    getUrl: (uploadedFile: UploadedFile, size?: ImgSize) => {
        if (size) {
            const fileUrl = uploadedFile[size];
            if (fileUrl) {
                return fileUrl;
            }
        }

        // to fix some time url start with http://localhost:1337/...
        const url = (uploadedFile.url && uploadedFile.url.startsWith('http://')) ?
            (new URL(uploadedFile.url)).pathname :
            uploadedFile.url;
        
        return `${FILE_HOST}${url}`;
    }
};
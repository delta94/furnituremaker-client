import { fileHostEntry } from '@/restful/environment';

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
    addHostToPath: (url: string) => {
        if (url.startsWith('/uploads')) {
            return fileHostEntry(url);
        }

        return url;
    },
    getUrl: (uploadedFile: UploadedFile, size?: ImgSize) => {
        if (size) {
            const fileUrl = uploadedFile[size];
            if (fileUrl) {
                return  uploadedFileUtils.addHostToPath(fileUrl);
            }
        }

        // to fix some time url start with http://localhost:1337/...
        const url = (uploadedFile.url && uploadedFile.url.startsWith('http://')) ?
            (new URL(uploadedFile.url)).pathname :
            uploadedFile.url;

        return uploadedFileUtils.addHostToPath(url);
    }
};
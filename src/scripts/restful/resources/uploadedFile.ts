export interface UploadedFile {
    readonly id?: string;
    readonly name?: string;
    readonly hash?: string;
    readonly ext?: string;
    readonly size?: number;
    readonly url?: string;
    readonly provider?: string;
}

export const uploadedFileUtils = {
    getUrl: (uploadedFile: UploadedFile) => `${FILE_HOST}${uploadedFile.url}`
};
export interface UploadedFile {
    id?: string;
    name?: string;
    hash?: string;
    ext?: string;
    size?: number;
    url?: string;
    provider?: string;
}

export function completeFileUrl(file: UploadedFile) {
    file.url = `http://localhost:1337${file.url}`;
    return file;
}
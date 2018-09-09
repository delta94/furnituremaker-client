
export const apiEntry = (api: string) => {
    return `${API_ENTRY}${api}`;
};

export const fileHostEntry = (filePath: string) => {
    return `${FILE_HOST}${filePath}`;
};
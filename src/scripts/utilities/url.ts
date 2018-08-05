export const getUrlSearchParam = (key: string, query?: string) => {
    const currentUrlParams = query ? new URLSearchParams(query) : new URLSearchParams();
    return currentUrlParams.get(key);
};
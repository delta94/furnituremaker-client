/// <reference path="node_modules/@types/three" />
/// <reference path="node_modules/ts-nameof/ts-nameof.d.ts" />

declare module '*.scss' {
    const content: unknown;
    export default content;
}

interface Window {
    readonly THREE: THREE;
}

const API_ENTRY: string;
const FILE_HOST: string;
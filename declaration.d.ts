/// <reference path="node_modules/@types/three" />

declare module '*.scss' {
    const content: any;
    export default content;
}

interface Window {
    THREE: THREE
}
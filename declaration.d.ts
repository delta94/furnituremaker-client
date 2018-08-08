// tslint:disable:readonly-keyword
// tslint:disable:no-any

/// <reference path="node_modules/@types/three" />
/// <reference path="node_modules/ts-nameof/ts-nameof.d.ts" />
///  <reference path="src" />
declare module '*.scss' {
    const content: unknown;
    export default content;
}

interface Window {
    readonly THREE: THREE;
    readonly __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    configuration: any;
}

const API_ENTRY: string;
const FILE_HOST: string;
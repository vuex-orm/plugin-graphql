import { Model as ORMModel } from "@vuex-orm/core";
import VuexORMGraphQLPlugin from "./index";
export declare function setupTestUtils(plugin: typeof VuexORMGraphQLPlugin): void;
export interface MockOptions {
    [key: string]: any;
}
declare type ReturnObject = {
    [key: string]: any;
};
export declare type ReturnValue = (() => ReturnObject | Array<ReturnObject>) | ReturnObject | Array<ReturnObject>;
export declare class Mock {
    readonly action: string;
    readonly options?: MockOptions;
    modelClass?: typeof ORMModel;
    returnValue?: ReturnValue;
    constructor(action: string, options?: MockOptions);
    for(modelClass: typeof ORMModel): Mock;
    andReturn(returnValue: ReturnValue): Mock;
    private installMock;
}
export declare function clearORMStore(): Promise<void>;
export declare function mock(action: string, options?: MockOptions): Mock;
export {};

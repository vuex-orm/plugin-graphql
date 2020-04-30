import Model from "../orm/model";
export declare enum ConnectionMode {
    AUTO = 0,
    PLAIN = 1,
    NODES = 2,
    EDGES = 3
}
export declare enum ArgumentMode {
    TYPE = 0,
    LIST = 1
}
export default interface Adapter {
    getRootQueryName(): string;
    getRootMutationName(): string;
    getNameForPersist(model: Model): string;
    getNameForPush(model: Model): string;
    getNameForDestroy(model: Model): string;
    getNameForFetch(model: Model, plural: boolean): string;
    getConnectionMode(): ConnectionMode;
    getArgumentMode(): ArgumentMode;
    getFilterTypeName(model: Model): string;
    getInputTypeName(model: Model, action?: string): string;
    prepareSchemaTypeName(name: string): string;
}

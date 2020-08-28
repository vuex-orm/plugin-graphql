import Adapter, { ConnectionMode, ArgumentMode } from "../adapter";
import Model from "../../orm/model";
export default class DefaultAdapter implements Adapter {
    getRootMutationName(): string;
    getRootQueryName(): string;
    getConnectionMode(): ConnectionMode;
    getArgumentMode(): ArgumentMode;
    getFilterTypeName(model: Model): string;
    getInputTypeName(model: Model, action?: string, mutation?: string): string;
    getNameForDestroy(model: Model): string;
    getNameForFetch(model: Model, plural: boolean): string;
    getNameForPersist(model: Model): string;
    getNameForPush(model: Model): string;
    prepareSchemaTypeName(name: string): string;
}

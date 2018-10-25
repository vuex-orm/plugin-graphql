import { Model as ORMModel, Attribute } from "@vuex-orm/core";
export interface Fields {
    [key: string]: Attribute;
}
export declare class User extends ORMModel {
    static entity: string;
    static fields(): Fields;
}
export declare class Profile extends ORMModel {
    static entity: string;
    static fields(): Fields;
}
export declare class Video extends ORMModel {
    static entity: string;
    static eagerLoad: string[];
    static fields(): Fields;
}
export declare class Post extends ORMModel {
    static entity: string;
    static eagerLoad: string[];
    static fields(): Fields;
}
export declare class Comment extends ORMModel {
    static entity: string;
    static fields(): Fields;
}
export declare class TariffTariffOption extends ORMModel {
    static entity: string;
    static primaryKey: string[];
    static fields(): Fields;
}
export declare class Tariff extends ORMModel {
    static entity: string;
    static eagerLoad: string[];
    static fields(): Fields;
}
export declare class TariffOption extends ORMModel {
    static entity: string;
    static eagerLoad: string[];
    static fields(): Fields;
}
export declare class Category extends ORMModel {
    static entity: string;
    static fields(): Fields;
}
export declare function setupMockData(): Promise<(import("vuex").Store<any> | import("../../src/vuex-orm-graphql").default)[]>;

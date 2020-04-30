import { GraphQLField, GraphQLSchema, GraphQLType, GraphQLTypeDefinition } from "../support/interfaces";
import { ConnectionMode } from "../adapters/adapter";
export default class Schema {
    private schema;
    private types;
    private mutations;
    private queries;
    constructor(schema: GraphQLSchema);
    determineQueryMode(): ConnectionMode;
    getType(name: string, allowNull?: boolean): GraphQLType | null;
    getMutation(name: string, allowNull?: boolean): GraphQLField | null;
    getQuery(name: string, allowNull?: boolean): GraphQLField | null;
    static returnsConnection(field: GraphQLField): boolean;
    static getRealType(type: GraphQLTypeDefinition): GraphQLTypeDefinition;
    static getTypeNameOfField(field: GraphQLField): string;
}

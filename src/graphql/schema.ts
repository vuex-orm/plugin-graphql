import {
  GraphQLField,
  GraphQLSchema,
  GraphQLType,
  GraphQLTypeDefinition
} from "../support/interfaces";
import { upcaseFirstLetter } from "../support/utils";

export default class Schema {
  private schema: GraphQLSchema;
  private types: Map<string, GraphQLType>;
  private mutations: Map<string, GraphQLField>;
  private queries: Map<string, GraphQLField>;

  public constructor(schema: GraphQLSchema) {
    this.schema = schema;
    this.types = new Map<string, GraphQLType>();
    this.mutations = new Map<string, GraphQLField>();
    this.queries = new Map<string, GraphQLField>();

    this.schema.types.forEach((t: GraphQLType) => this.types.set(t.name, t));

    this.getType("Query")!.fields!.forEach(f => this.queries.set(f.name, f));
    this.getType("Mutation")!.fields!.forEach(f => this.mutations.set(f.name, f));
  }

  public determineQueryMode(): string {
    let connection: GraphQLType | null = null;

    this.queries.forEach(query => {
      const typeName = Schema.getTypeNameOfField(query);
      if (typeName.endsWith("TypeConnection")) {
        connection = this.getType(typeName);
        return false; // break
      }
      return true;
    });

    /* istanbul ignore next */
    if (!connection) {
      throw new Error(
        "Can't determine the connection mode due to the fact that here are no connection types in the schema. Please set the connectionQueryMode via Vuex-ORM-GraphQL options!"
      );
    }

    if (connection!.fields!.find(f => f.name === "nodes")) {
      return "nodes";
    } else if (connection!.fields!.find(f => f.name === "edges")) {
      return "edges";
    } else {
      return "plain";
    }
  }

  public getType(name: string, allowNull: boolean = false): GraphQLType | null {
    name = upcaseFirstLetter(name);
    const type = this.types.get(name);

    if (!allowNull && !type) {
      throw new Error(`Couldn't find Type of name ${name} in the GraphQL Schema.`);
    }

    return type || null;
  }

  public getMutation(name: string, allowNull: boolean = false): GraphQLField | null {
    const mutation = this.mutations.get(name);

    /* istanbul ignore next */
    if (!allowNull && !mutation) {
      throw new Error(`Couldn't find Mutation of name ${name} in the GraphQL Schema.`);
    }

    return mutation || null;
  }

  public getQuery(name: string, allowNull: boolean = false): GraphQLField | null {
    const query = this.queries.get(name);

    /* istanbul ignore next */
    if (!allowNull && !query) {
      throw new Error(`Couldn't find Query of name ${name} in the GraphQL Schema.`);
    }

    return query || null;
  }

  static returnsConnection(field: GraphQLField): boolean {
    return Schema.getTypeNameOfField(field).endsWith("TypeConnection");
  }

  static getRealType(type: GraphQLTypeDefinition): GraphQLTypeDefinition {
    if (type.kind === "NON_NULL") {
      return this.getRealType(type.ofType);
    } else {
      return type;
    }
  }

  static getTypeNameOfField(field: GraphQLField): string {
    const type = this.getRealType(field.type);

    if (type.kind === "LIST") {
      return `[${type.ofType.name}]`;
    }

    const name = type.name || type.ofType.name || type.ofType.ofType.name;

    /* istanbul ignore next */
    if (!name) throw new Error(`Can't find type name for field ${field.name}`);

    return name;
  }
}

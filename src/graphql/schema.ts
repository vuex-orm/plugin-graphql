import { GraphQLField, GraphQLSchema, GraphQLType } from '../support/interfaces';
import { upcaseFirstLetter } from '../support/utils';

export default class Schema {
  private schema: GraphQLSchema;
  private types: Map<string, GraphQLType>;
  private mutations: Map<string, GraphQLField>;
  private queries: Map<string, GraphQLField>;

  public constructor (schema: GraphQLSchema) {
    this.schema = schema;
    this.types = new Map<string, GraphQLType>();
    this.mutations = new Map<string, GraphQLField>();
    this.queries = new Map<string, GraphQLField>();

    this.schema.types.forEach((t: GraphQLType) => this.types.set(t.name, t));

    this.getType('Query').fields!.forEach(f => this.queries.set(f.name, f));
    this.getType('Mutation').fields!.forEach(f => this.mutations.set(f.name, f));
  }

  public getType (name: string): GraphQLType {
    name = upcaseFirstLetter(name);
    const type = this.types.get(name);

    if (!type) throw new Error(`Couldn't find Type of name ${name} in the GraphQL Schema.`);

    return type;
  }

  public getMutation (name: string): GraphQLField {
    const mutation = this.mutations.get(name);

    if (!mutation) throw new Error(`Couldn't find Mutation of name ${name} in the GraphQL Schema.`);

    return mutation;
  }

  public getQuery (name: string): GraphQLType {
    const query = this.queries.get(name);

    if (!query) throw new Error(`Couldn't find Query of name ${name} in the GraphQL Schema.`);

    return query;
  }

  public returnsConnection (field: GraphQLField) {
    return field.type.name.endsWith('TypeConnection');
  }
}

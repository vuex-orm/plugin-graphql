const inflection = require('inflection');
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

interface ActionParams {
  state: any;
  dispatch: any;
}

interface FetchParams {
  filter?: Filter;
}

interface Data {
  [index: string]: any;
}

interface Filter extends Object {
  [index: string]: any;
}

class VuexORMApollo {
  private httpLink: HttpLink | null = null;
  private apolloClient: ApolloClient<any> | null = null;
  private components: any = null;
  private options: any = null;


  public static install(components: any, options: any) {
    return new VuexORMApollo(components, options);
  }


  public constructor(components: any, options: any) {
    this.components = components;
    this.options = options;

    this.setupApollo();
    this.setupFetch();
  }

  private setupApollo () {
    this.httpLink = new HttpLink({
      uri: '/graphql'
    });

    this.apolloClient = new ApolloClient({
      link: this.httpLink,
      cache: new InMemoryCache(),
      connectToDevTools: true
    });
  }

  private setupFetch () {
    this.components.subActions.fetch = async ({ state, dispatch }: ActionParams, { filter }: FetchParams) => {
      // Ignore empty filters
      if (filter && Object.keys(filter).length === 0) filter = undefined;
      const multiple = !(filter && filter.id);

      const query = this.buildQuery(state, multiple, filter);
      const response = await (this.apolloClient as ApolloClient<any>).query({ query });

      const data: Data = this.transformIncomingData(response.data);

      Object.keys(data).forEach((key) => {
        dispatch('insert', { data: data[key] });
      });
    };


    console.log('subactions', this.components.subActions);
  }

  private transformIncomingData (data: Data | Array<Data>): Data {
    let result: Data = {};

    if (data instanceof Array) {
      result = data.map(d => this.transformIncomingData(d));
    } else {
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          if (data[key] instanceof Object) {
            if (data[key].nodes) {
              result[inflection.pluralize(key)] = this.transformIncomingData(data[key].nodes);
            } else {
              result[inflection.singularize(key)] = this.transformIncomingData(data[key]);
            }
          } else if (key === 'id') {
            result[key] = parseInt(data[key], 0);
          } else {
            result[key] = data[key];
          }
        }
      });
    }

    return result;
  }

  /*private getQueryFields () {
    const fields = this.fields()

    // field.constructor.name is one of Attr, BelongsToMany, BelongsTo, HasMany, HasManyBy, HasOne
    return Object.keys(fields).filter((n) => (fields[n].constructor.name === 'Attr' && !n.endsWith('Id')))
  }

  private getRelations () {
    const fields = this.fields()
    return Object
      .keys(fields)
      .filter((n) => fields[n].constructor.name !== 'Attr')
  }

  private getQueryRelations (rootModel) {
    const fields = this.fields()
    return Object
      .keys(fields)
      .filter((n) => {
        return fields[n].constructor.name !== 'Attr' &&
          n !== rootModel.singularEntity() &&
          n !== rootModel.entity
      })
      .map((n) => {
        const field = fields[n]
        console.log('field', field)

        if (field.constructor.name !== 'BelongsTo') {
          return this.buildField(field.related, true)
        } else {
          return this.buildField(field.parent, false)
        }

      })
  }

  private buildField (model: Object, multiple: boolean = true, filter: Filter | null = null) {
    let params: string = ''

    if (filter) {
      params = `(id: ${filter.id})`
    }

    if (multiple) {
      return `${model.entity}${params} {
                nodes {
                    ${model.getQueryFields()}
                    ${model.getQueryRelations(this)}
                }
            }`
    } else {
      return `${model.singularEntity()}${params} {
                ${model.getQueryFields()}
                ${model.getQueryRelations(this)}
            }`
    }
  }*/

  private buildQuery (model: any, multiple: boolean = true, filter?: Filter): any {
    console.log('model', model, this.options);
    // return gql(`{ ${this.buildField(model, multiple, filter)} }`)
  }

}

export default VuexORMApollo;

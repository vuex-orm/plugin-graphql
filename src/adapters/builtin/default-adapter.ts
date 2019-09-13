import Adapter, { ConnectionMode, ArgumentMode } from '../adapter'
import Model from '../../orm/model'
import { upcaseFirstLetter } from '../../support/utils'

export default class DefaultAdapter implements Adapter {
  getRootMutationName(): string {
    return 'Mutation'
  }

  getRootQueryName(): string {
    return 'Query'
  }

  getConnectionMode(): ConnectionMode {
    return ConnectionMode.NODES
  }

  getArgumentMode(): ArgumentMode {
    return ArgumentMode.TYPE
  }

  getFilterTypeName(model: Model): string {
    return `${upcaseFirstLetter(model.singularName)}Filter`
  }

  getInputTypeName(model: Model): string {
    return `${upcaseFirstLetter(model.singularName)}Input`
  }

  getNameForDestroy(model: Model): string {
    return `delete${upcaseFirstLetter(model.singularName)}`
  }

  getNameForFetch(model: Model, plural: boolean): string {
    return plural ? model.pluralName : model.singularName
  }

  getNameForPersist(model: Model): string {
    return `create${upcaseFirstLetter(model.singularName)}`
  }

  getNameForPush(model: Model): string {
    return `update${upcaseFirstLetter(model.singularName)}`
  }

  prepareSchemaTypeName(name: string): string {
    return upcaseFirstLetter(name)
  }
}

import { Arguments } from './support/interfaces';
import ORMModel from '@vuex-orm/core/lib/model/Model';
import Model from './orm/model';
import Context from './common/context';

export interface MockOptions {
  [key: string]: any;
}

export type ReturnValue = () => (Object | Array<Object>) | Object | Array<Object>;

export class Mock {
  public readonly action: string;
  public readonly options?: MockOptions;
  public modelClass?: ORMModel;
  public returnValue?: ReturnValue;

  constructor (action: string, options?: MockOptions) {
    this.action = action;
    this.options = options;
  }

  public for (modelClass: ORMModel): Mock {
    this.modelClass = modelClass;
    return this;
  }

  public andReturn (returnValue: ReturnValue): Mock {
    this.returnValue = returnValue;
    this.installMock();
    return this;
  }

  private installMock (): void {
    const context: Context = Context.getInstance();

    if (this.action === 'simpleQuery' || this.action === 'simpleMutation') {
      context.addGlobalMock(this);
    } else {
      const model: Model = context.getModel(this.modelClass!.entity);
      model.$addMock(this);
    }
  }
}

export async function clearORMStore () {
  await Context.getInstance().database.store.dispatch('entities/deleteAll');
}

export function mock (action: string, options?: MockOptions): Mock {
  return new Mock(action, options);
}
